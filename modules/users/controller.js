import { User } from "./model.js";
import * as UsersService from "./service.js"


// const hashPassword = (pwd) => "_#ash_$alt_" + pwd

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		console.error(error.message);
		next(error);
	}
};

export const signup = async (req, res, next) => {
	const { email, password } = req.body;

	const user = await UsersService.getUser({ email });

	if (user) return res.status(409).json({ message: "Email already in use" });

	try {
		// const hashedPwd = hashPassword(password);
		 newUser = new User({email})
		 newUser.setPassword(password)
		return res.status(201).json({ message: "User registered" });
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
const { email, password } = req.body;

const user =  await UsersService.getUser({email})

if(!user || !isValidPwD) return res.status(401).json({message:"invalid credentials"})

const payload = {
	id: user.id,
	username: user.username
}
const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });

return res.json({ token })}
catch (error){
	next(error)
}

}

export const logout = async (req, res, next) => {
	
}
export const current = async (req, res, next) => {

	
}
export const updateSubscription = async (req, res, next) => {
	
}