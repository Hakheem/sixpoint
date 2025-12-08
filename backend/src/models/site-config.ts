import mongoose, { Schema, Document } from "mongoose";

export interface ISiteConfig extends Document {
  logoUrl?: string;
  heroImageUrl?: string;
  heroMainHeading?: string;
  heroHighlightedText?: string;
  heroDescription?: string;
  phone1?: string;
  phone2?: string;
  location?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;
  createdAt: Date;
  updatedAt: Date;
}

const siteConfigSchema = new Schema<ISiteConfig>(
  {
    logoUrl: String,
    heroImageUrl: String,
    heroMainHeading: String,
    heroHighlightedText: String,
    heroDescription: String,
    phone1: String,
    phone2: String,
    location: String,
    facebook: String,
    instagram: String,
    tiktok: String,
    youtube: String,
    twitter: String,
  },
  { timestamps: true }
);

export const SiteConfig = mongoose.model<ISiteConfig>(
  "SiteConfig",
  siteConfigSchema
);
