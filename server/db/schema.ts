import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at").defaultNow(),
  user_id: text("user_id").unique().notNull(),
  email: text("email").unique().notNull(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  image_url: text("image_url"),
});

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at").defaultNow(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.user_id, { onDelete: "cascade" }),
  image_url: text("image_url").notNull(),
  caption: text("caption"),
});

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at").defaultNow(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.user_id, { onDelete: "cascade" }),
  post_id: text("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  content: text("caption").notNull(),
});

export const likes = pgTable("likes", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at").defaultNow(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.user_id, { onDelete: "cascade" }),
  post_id: text("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
});

export const saves = pgTable("saves", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at").defaultNow(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.user_id, { onDelete: "cascade" }),
  post_id: text("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
});

// Relations

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  likes: many(likes),
  saves: many(saves),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.user_id],
    references: [users.user_id],
  }),
  comments: many(comments),
  likes: many(likes),
  saves: many(saves),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.user_id],
    references: [users.user_id],
  }),
  post: one(posts, {
    fields: [comments.post_id],
    references: [posts.id],
  }),
}));

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.user_id],
    references: [users.user_id],
  }),
  post: one(posts, {
    fields: [likes.post_id],
    references: [posts.id],
  }),
}));

export const savesRelations = relations(saves, ({ one }) => ({
  user: one(users, {
    fields: [saves.user_id],
    references: [users.user_id],
  }),
  post: one(posts, {
    fields: [saves.post_id],
    references: [posts.id],
  }),
}));

// Types
export type User = typeof users.$inferSelect;
export type TUser = typeof users.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type TPost = typeof posts.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type TComment = typeof comments.$inferInsert;

export type Like = typeof likes.$inferSelect;
export type TLike = typeof likes.$inferInsert;

export type Save = typeof saves.$inferSelect;
export type TSave = typeof saves.$inferInsert;
