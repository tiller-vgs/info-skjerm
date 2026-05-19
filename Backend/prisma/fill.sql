INSERT INTO admintable (id, StartDate, houramount, dbhouramount, TimeSets)
VALUES (1, 'today', 3, 7, ARRAY['06:00-08:00', '11:00-12:00', '13:00-15:00', '16:00-17:00'])
ON CONFLICT (id) DO UPDATE
SET (id, StartDate, houramount, dbhouramount, TimeSets) = 
(EXCLUDED.id, EXCLUDED.StartDate, EXCLUDED.houramount, EXCLUDED.dbhouramount, EXCLUDED.TimeSets);

INSERT INTO earlyerweatherdays (id, date, data)
VALUES (1, '', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;



