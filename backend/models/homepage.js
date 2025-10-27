import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Le titre est requis"],
    minLength: [3, "Le titre doit contenir au moins 3 caractères"],
    trim: true,
  },
  subtitle: {
    type: String,
    required: [true, "Le sous-titre est requis"],
    minLength: [3, "Le sous-titre doit contenir au moins 3 caractères"],
    trim: true,
  },
  text: {
    type: String,
    required: [true, "Le texte est requis"],
    minLength: [10, "Le texte doit contenir au moins 10 caractères"],
    trim: true,
  },
  image: {
    public_id: {
      type: String,
      required: [true, "L'image est requise"],
    },
    url: {
      type: String,
      required: [true, "L'URL de l'image est requise"],
    },
  },
});

const homePageSchema = new mongoose.Schema(
  {
    sections: {
      type: [sectionSchema],
      validate: {
        validator: function (sections) {
          return sections.length === 3;
        },
        message: "Vous devez avoir exactement 3 sections",
      },
      required: [true, "Les sections sont requises"],
    },
  },
  {
    timestamps: true,
  },
);

// Middleware pour limiter à 1 seul document HomePage
homePageSchema.pre("save", async function (next) {
  if (this.isNew) {
    const count = await mongoose.models.HomePage.countDocuments();
    if (count >= 1) {
      throw new Error(
        "Un seul document HomePage est autorisé. Veuillez modifier le document existant.",
      );
    }
  }
  next();
});

export default mongoose.models.HomePage ||
  mongoose.model("HomePage", homePageSchema);
