DO $$ BEGIN
 CREATE TYPE "cost" AS ENUM('$', '$$', '$$$', '$$$$');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "distance" AS ENUM('home', 'walkable', '<10 minutes away', '10-20 minutes away', '20-40 minutes away', '40+ minutes away');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "popsicles" (
	"id" serial PRIMARY KEY NOT NULL,
	"idea" text NOT NULL,
	"description" text,
	"isFood" boolean DEFAULT false NOT NULL,
	"canOrderIn" boolean DEFAULT false NOT NULL,
	"distance" "distance" NOT NULL,
	"cost" "cost",
	"isGame" boolean DEFAULT false NOT NULL
);
