import { Verify, VerifyRole } from "../middleware/verify.js";

app.get("/v1/admin", Verify, VerifyRole, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the Admin portal!",
  });
});
