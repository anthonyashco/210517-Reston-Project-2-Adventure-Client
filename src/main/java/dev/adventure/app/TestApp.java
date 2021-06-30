package dev.adventure.app;
import com.google.gson.Gson;
import io.javalin.Javalin;

import java.util.ArrayList;
import java.util.List;

public class TestApp {

    private static final Gson gson = new Gson();

    static class Claim {
        public String claim;
        public int amount;
        public boolean approved;

        public Claim (String claim, int amount, boolean approved) {
            this.claim = claim;
            this.amount = amount;
            this.approved = approved;
        }
    }

    static class Login {
        public int id;

        public Login (int id) {
            this.id = id;
        }
    }

    static List<Claim> claims = new ArrayList<>();

    public static void main(String[] args) {
        Javalin app = Javalin.create(config -> {
            config.enableCorsForAllOrigins();
            config.enableDevLogging();
            config.addStaticFiles("/static");
        });

        Claim claim1 = new Claim("Barbecued arm", 500, false);
        Claim claim2 = new Claim("Dented cuirass", 150, true);
        claims.add(claim1);
        claims.add(claim2);

        app.get("/", (ctx) -> ctx.render("/static/html/login.html"));

        app.post("/login", (ctx) -> {
            System.out.println(ctx.body());
            ctx.result(gson.toJson(new Login(1)));
        });

        app.post("/claims", (ctx) -> {
            Claim claim = gson.fromJson(ctx.body(), Claim.class);
            claims.add(claim);
            ctx.result("success");
        });

        app.get("/claims", (ctx) -> {
            String claimsJson = gson.toJson(claims);
            ctx.result(claimsJson);
        });

        app.start(7500);
    }
}
