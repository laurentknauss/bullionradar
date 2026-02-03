-- Create dealer_prices table for storing scraped prices
CREATE TABLE dealer_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coin_slug TEXT NOT NULL,
  coin_name TEXT NOT NULL,
  dealer TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',
  in_stock BOOLEAN DEFAULT true,
  product_url TEXT,
  scraped_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS and allow public read
ALTER TABLE dealer_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON dealer_prices FOR SELECT USING (true);
