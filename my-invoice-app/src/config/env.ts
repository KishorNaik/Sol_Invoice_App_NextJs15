import * as dotenv from 'dotenv';

dotenv.config();

export const dbConfig={
    connectionString: process.env.XATA_POSTGRESQL_URL
}

export const clerkConfig={
        secretKey: process.env.CLERK_SECRET_KEY,
        apiKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    auth:{
        signIn: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
        signUp: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
        signInFallbackUrl:process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
    }
}

export const stripeConfig={
    secretKey: String(process.env.STRIPE_SECRET_KEY)
}