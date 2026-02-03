import { OAuth2Client } from "google-auth-library";
import { IGoogleAuthService } from "../../domain/services/IGoogleAuthService";

export class GoogleAuthServiceImpl implements IGoogleAuthService {
    private client: OAuth2Client | null = null;

    private getClient(): OAuth2Client {
        if (!this.client) {
            this.client = new OAuth2Client(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET,
                process.env.GOOGLE_CALLBACK_URL
            )
        }
        return this.client;
    }

    generateAuthUrl(role: string, mode: string): string {
        const state = JSON.stringify({ role, mode });
        return this.getClient().generateAuthUrl({
            access_type: "offline",
            scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
            state: state
        });
    }

    async getGoogleEmail(code: string): Promise<string> {
        const client = this.getClient();
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token!,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        const payload = ticket.getPayload();
        const email = payload?.email;

        if (!email) {
            throw new Error("Google login failed! No email provided in token")
        }

        return email;
    }
}
