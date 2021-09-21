require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const client = new OAuth2Client(
  process.env.OAuth2Client
);
const router = express.Router();



router.post("/", async (req, res) => {
  const { tokenId } = req.body;
  let payload;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience:
        process.env.OAuth2Client,
    });
    payload = ticket.getPayload();
    console.log("okkkkkkkkkkkkkkkkkkkkkkkkkkk", payload);
  } catch (err) {
    res.status(403).send("Invalid credentials");
  }

  const {
    given_name: givenName,
    name,
    email,
    picture,
    email_verified,
  } = payload;
  if (email_verified) {
    User.findOne({ email }, async (err, user) => {
      console.log("i am user", user);
      if (err) {
        return res.status(400).json({ error: "Something went wrong" });
      }

      if (user) {
        // const token = jwt.sign({ _id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
        //   expiresIn: "7d",
        // });
        // console.log("token is here.........", token);
        // res.cookie("jwtExistingUserToken", token, {
        //   httpOnly: true,
        //   expires: new Date(Date.now() + 30000),
        // });
        // // return res.redirect('/chat');
        // store.set('backend-token', {token : token})
        return res.json({ userStatus: 'USER EXISTS' });
      } 
      else {
        const hashedPassword = await bcrypt.hash(
          email + process.env.PASSWORD_SECRET,
          10
        );

        const newUser = await User.create({
          name,
          email,
          password: hashedPassword,
        });
        console.log("i am new user", newUser);


        await newUser.save((err, data) => {
          console.log("here is data..................", data);
          if (err) {
            return res.json({ error: "Something failed..." });
          }
          // const credentials = {
          //   _id: data._id,
          // };
          // const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {
          //   expiresIn: "7d",
          // });
          // const { _id, name, email } = newUser;

          // res.cookie("jwtNewUserToken", token, { httpOnly: true });
          // console.log("User created...", newUser);

          // return res.json({ token });
        return res.json({ userStatus: 'USER EXISTS' });

        });
      }
    });
  }
  //   const credentials = {
  //     signedIn: true,
  //     givenName,
  //     name,
  //     email,
  //     picture,
  //   };

  //   const token = jwt.sign(credentials, process.env.JWT_SECRET);
  //   //   res.cookie("jwt", token, { httpOnly: true });

  //   res.json({ credentials, token });
});

module.exports = router;
