export default function (app) {
  const mongoose = app.mongoose;
  const RoleSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now }
  });
  return mongoose.model('Role', RoleSchema);
}