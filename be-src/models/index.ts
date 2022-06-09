import { User } from "./usuarios";
import { Auth } from "./auth";
import { Mascota } from "./mascotas";

Auth.belongsTo(User);
Mascota.belongsTo(User);
User.hasMany(Mascota);
// Mascotas.hasMany(User);

export { User, Auth, Mascota };
