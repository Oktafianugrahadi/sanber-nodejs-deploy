"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const encryption_1 = require("../utils/encryption");
const env_1 = require("../utils/env");
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [
        {
            type: String,
            default: "user",
        },
    ],
    profilePicture: {
        type: String,
        default: "default.jpg",
    },
}, {
    timestamps: true,
});
// Middleware untuk enkripsi password sebelum menyimpan
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password")) {
            user.password = (0, encryption_1.encrypt)(env_1.SECRET, user.password);
        }
        next();
    });
});
// Middleware untuk enkripsi password sebelum melakukan update
UserSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user._update.password) {
            user._update.password = (0, encryption_1.encrypt)(env_1.SECRET, user._update.password);
        }
        next();
    });
});
// Menghapus password sebelum mengembalikan objek pengguna sebagai JSON
UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
