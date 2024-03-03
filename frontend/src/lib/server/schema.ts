import { boolean, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

export const cost = pgEnum("cost", [
    '$', '$$', '$$$', '$$$$'
]);

export const distance = pgEnum("distance", [
    'home', 'walkable', '<10 minutes away', '10-20 minutes away',
    '20-40 minutes away', '40+ minutes away'
]);

export const popsicles = pgTable("popsicles", {
    id: serial("id").primaryKey().notNull(),
    idea: text("idea").notNull(),
    description: text("description"),
    isFood: boolean("isFood").notNull().default(false),
    canOrderIn: boolean("canOrderIn").notNull().default(false),
    distance: distance("distance").notNull(),
    cost: cost("cost"),
    isGame: boolean("isGame").notNull().default(false),

});