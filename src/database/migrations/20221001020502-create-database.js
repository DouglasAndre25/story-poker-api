'use strict'

module.exports = {
    async up (queryInterface) {
        return queryInterface.sequelize.query(`
        CREATE TYPE "participant_types" AS ENUM (
            'observer',
            'player'
          );
          
          CREATE TYPE "room_types" AS ENUM (
            'fibonacci',
            'relative',
            'sequential',
            'cards'
          );
          
          CREATE TYPE "status_types" AS ENUM (
            'queue',
            'active',
            'completed'
          );
          
          CREATE TABLE "room" (
            "id" varchar,
            "name" varchar NOT NULL,
            "type" room_types,
            "owner_id" int NOT NULL,
            PRIMARY KEY ("id")
          );
          
          CREATE TABLE "room_card" (
            "id" SERIAL,
            "room_id" varchar NOT NULL,
            "card_id" int NOT NULL,
            PRIMARY KEY ("id")
          );
          
          CREATE TABLE "card" (
            "id" SERIAL,
            "value" varchar NOT NULL,
            "type" room_types,
            PRIMARY KEY ("id")
          );
          
          CREATE TABLE "participant" (
            "id" SERIAL,
            "nickname" varchar NOT NULL,
            "type" participant_types,
            "user_id" int,
            "room_id" varchar NOT NULL,
            PRIMARY KEY ("id")
          );
          
          CREATE TABLE "user" (
            "id" SERIAL,
            "name" varchar NOT NULL,
            "email" varchar NOT NULL,
            "password" varchar NOT NULL,
            PRIMARY KEY ("id")
          );
          
          CREATE TABLE "story" (
            "id" SERIAL,
            "title" varchar NOT NULL,
            "estimation" varchar,
            "duration_time" time,
            "status" status_types,
            "room_id" varchar NOT NULL,
            PRIMARY KEY ("id")
          );
          
          CREATE TABLE "story_participant" (
            "id" SERIAL,
            "participant_id" int NOT NULL,
            "story_id" int NOT NULL,
            "room_card_id" int NOT NULL,
            PRIMARY KEY ("id")
          );
          
          ALTER TABLE "room" ADD CONSTRAINT "fk_room3_id" FOREIGN KEY ("owner_id") REFERENCES "user" ("id");
          
          ALTER TABLE "room_card" ADD CONSTRAINT "fk_card_id" FOREIGN KEY ("card_id") REFERENCES "card" ("id") ON DELETE CASCADE;
          
          ALTER TABLE "room_card" ADD CONSTRAINT "fk_room2_id" FOREIGN KEY ("room_id") REFERENCES "room" ("id") ON DELETE CASCADE;
          
          ALTER TABLE "participant" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE;
          
          ALTER TABLE "participant" ADD CONSTRAINT "fk_room_id" FOREIGN KEY ("room_id") REFERENCES "room" ("id") ON DELETE CASCADE;
          
          ALTER TABLE "story" ADD CONSTRAINT "fk_room3_id" FOREIGN KEY ("room_id") REFERENCES "room" ("id") ON DELETE CASCADE;
          
          ALTER TABLE "story_participant" ADD CONSTRAINT "fk_participant_id" FOREIGN KEY ("participant_id") REFERENCES "participant" ("id") ON DELETE CASCADE;
          
          ALTER TABLE "story_participant" ADD CONSTRAINT "fk_story_id" FOREIGN KEY ("story_id") REFERENCES "story" ("id") ON DELETE CASCADE;
          
          ALTER TABLE "story_participant" ADD CONSTRAINT "fk_room_card_id" FOREIGN KEY ("room_card_id") REFERENCES "room_card" ("id") ON DELETE CASCADE;
        `)
    },

    async down (queryInterface) {
        return queryInterface.sequelize.query(`
            DROP TABLE IF EXISTS card cascade;
            DROP TABLE IF EXISTS participant cascade;
            DROP TABLE IF EXISTS room cascade;
            DROP TABLE IF EXISTS room_card cascade;
            DROP TABLE IF EXISTS story cascade;
            DROP TABLE IF EXISTS story_participant cascade;
            DROP TABLE IF EXISTS "user" cascade;
            DROP TYPE "participant_types";
            DROP TYPE "room_types";
            DROP TYPE "status_types";
        `)
    }
}

