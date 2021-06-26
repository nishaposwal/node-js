const express = require("express");

const User = require("../models/User");
const auth = require("../middleware/auth")

const router = new express.Router()
router.use(express.json());


router.post("/user", async (req, res) => {
  const user = User(req.body);
  try {
    const token = await user.generateToken()
    await user.save();
    res.send({user, token});
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
});
router.post("/logout", auth, async(req, res)=>{
try {
  req.user.tokens = req.user.tokens.filter((token)=>{
   return token.token != req.token
  })
  req.user.save()
  res.send("success")
} catch (error) {
  res.status(500).send()
}
})
router.post('/logoutAll', auth, async (req, res)=>{
try {
  req.user.tokens = []
  await req.user.save()
  res.send("success")
} catch (error) {
  res.status(500).send()
}
})
router.post("/user/login", async (req,res)=>{
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateToken()
    res.send({user , token})
  } catch (error) {
    res.status(400).send(error)
  }
})
router.delete("/user/me", auth, async (req, res) => {
  try {
   await req.user.remove()
   res.send(req.user)
  } catch (e) {
    res.send(e);
  }
});
router.get("/my-profile", auth, async (req, res) => {
  res.send(req.user)
});
router.patch("/user/me", auth,  async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "age", "password"];
  const update = updates.find((update) => {
    if (!allowedUpdates.includes(update)) {
      return true;
    }
  });
  if (update) {
    return res.status(406).send("Not Allowed");
  }
  try {
    updates.forEach(update=> req.user[update] = req.body[update]
    )
    await req.user.save()
    res.send(req.user);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router