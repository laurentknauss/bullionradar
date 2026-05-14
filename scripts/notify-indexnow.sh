#!/usr/bin/env bash
# Notifie Bing/Yandex/Naver/Seznam (via IndexNow) que des URLs ont changé.
# Indexation quasi immédiate au lieu d'attendre le crawl naturel.
#
# Usage :
#   ./scripts/notify-indexnow.sh                    # Ping toutes les URLs du sitemap
#   ./scripts/notify-indexnow.sh url1 url2 url3     # Ping URLs spécifiques
#
# Setup : key file public/<KEY>.txt déjà créé + déployé en prod.
# Doc : https://www.indexnow.org/documentation
set -euo pipefail

readonly KEY="5619e0da7d9fcc1088e651c15a4bd0b0da5d9be12df7864b9a33144c4651af67"
readonly HOST="bullionradar.fr"
readonly KEY_LOCATION="https://${HOST}/${KEY}.txt"
readonly ENDPOINT="https://www.bing.com/indexnow"

# Vérifier que la clé est accessible publiquement (pré-requis IndexNow)
key_check=$(curl -s -o /dev/null -w "%{http_code}" "$KEY_LOCATION")
if [ "$key_check" != "200" ]; then
  echo "ERREUR : ${KEY_LOCATION} retourne HTTP ${key_check} (attendu 200)."
  echo "Assure-toi que public/${KEY}.txt est déployé en prod."
  exit 1
fi

# Construire la liste d'URLs : args du script ou sitemap
if [ "$#" -gt 0 ]; then
  url_list=("$@")
else
  echo "→ Aucun argument : ping de toutes les URLs du sitemap"
  mapfile -t url_list < <(
    curl -s "https://${HOST}/sitemap.xml" \
      | grep -oE '<loc>[^<]+</loc>' \
      | sed -E 's|<loc>([^<]+)</loc>|\1|'
  )
fi

if [ "${#url_list[@]}" -eq 0 ]; then
  echo "ERREUR : aucune URL à pinger."
  exit 1
fi

echo "→ Ping IndexNow pour ${#url_list[@]} URL(s)…"

# IndexNow accepte 10000 URLs max par requête. On envoie tout en une fois.
url_json=$(printf '"%s",' "${url_list[@]}" | sed 's/,$//')
payload=$(cat <<JSON
{
  "host": "${HOST}",
  "key": "${KEY}",
  "keyLocation": "${KEY_LOCATION}",
  "urlList": [${url_json}]
}
JSON
)

response=$(curl -s -w "\n%{http_code}" -X POST "$ENDPOINT" \
  -H "Content-Type: application/json; charset=utf-8" \
  -H "Host: www.bing.com" \
  -d "$payload")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

case "$http_code" in
  200|202)
    echo "✓ IndexNow OK (HTTP ${http_code}) — ${#url_list[@]} URLs envoyées."
    ;;
  400)
    echo "✗ HTTP 400 — Bad Request : ${body}"
    exit 1
    ;;
  403)
    echo "✗ HTTP 403 — Key file ${KEY_LOCATION} introuvable ou contenu invalide."
    exit 1
    ;;
  422)
    echo "✗ HTTP 422 — URLs invalides ou key mismatch."
    echo "Body : ${body}"
    exit 1
    ;;
  429)
    echo "✗ HTTP 429 — Trop de requêtes. Réessayer plus tard."
    exit 1
    ;;
  *)
    echo "✗ HTTP ${http_code} — ${body}"
    exit 1
    ;;
esac
