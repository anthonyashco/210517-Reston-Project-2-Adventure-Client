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

    public static void main(String[] args) {
        Javalin app = Javalin.create(config -> {
            config.enableCorsForAllOrigins();
            config.enableDevLogging();
            config.addStaticFiles("/static");
        });

        app.get("/", (ctx) -> ctx.render("/static/html/login.html"));

        app.post("/login", (ctx) -> ctx.result("1"));

        app.get("/claim", (ctx) -> {

            Claim claim1 = new Claim("Barbecued arm", 500, false);
            Claim claim2 = new Claim("Dented cuirass", 150, true);

            List<Claim> claims = new ArrayList<>();
            claims.add(claim1);
            claims.add(claim2);

            String claimsJson = gson.toJson(claims);

            ctx.result(claimsJson);
        });

        app.start();
    }
}
