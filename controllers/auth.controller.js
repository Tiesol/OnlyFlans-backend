const { generateToken } = require("../utils/jwt.utils");
const { sha1Encode } = require("../utils/text.utils"); // Ojo, sha1 es viejito, si puedes pásate a bcrypt luego xd
const userService = require("../services/user.service");
const followerService = require("../services/follower.service");
const creatorService = require("../services/creator.service");

exports.postRegister = async (req, res) => {
    const { email, password, username, role } = req.body;

    if (role !== 'creator' && role !== 'follower') {
        return res.status(400).json({ message: "Rol inválido" });
    }

    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: "El correo electrónico ya está registrado" });
    }

    try {
        const encodedPassword = sha1Encode(password);
        const usuario = await userService.createUser(email, encodedPassword, role);

        if (role === 'creator') {
            await creatorService.createCreator(username, usuario.id);
        } else if (role === 'follower') {
            await followerService.createFollower(username, usuario.id);
        }

        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al registrar usuario" });
    }
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await userService.findUserByEmail(email);
    
    if (!usuario) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectas" });
    }

    const encodedPassword = sha1Encode(password);
    if (encodedPassword !== usuario.password) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectas" });
    }

    const token = generateToken({
        id: usuario.id,
        role: usuario.role 
    });

    res.status(200).json({ token, role: usuario.role });
};