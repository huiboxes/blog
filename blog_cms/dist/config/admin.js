"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    auth: {
        url: env('PUBLIC_ADMIN_URL', '/huibox996'),
        secret: env("ADMIN_JWT_SECRET", "df3b12ff57543d4aed89ae3a350cae5b"),
    },
});
