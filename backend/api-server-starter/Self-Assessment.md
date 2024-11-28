Example 1: Centralizing mongoode id validation instead of repeating the same line of code many times.
In our code we have the following id validation for many of our functions:
```
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

```
However we were suggested to centralize this into a middleware like this:
```
const validateObjectId = (req, res, next) => {
    const { jobId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }
    next();
};

module.exports = { validateObjectId };
```
Which we would utilise in the routes:
```
const { validateObjectId } = require('../middleware/validateObjectId');

router.get('/:jobId', validateObjectId, getJobById);
router.put('/:jobId', validateObjectId, updateJob);
router.delete('/:jobId', validateObjectId, deleteJob);

```

Example 2: Differences in payload validation.
In our code we assign a type and requirement for a variable value of a model schema like so:
```
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true }
  }
});
```
However we were suggested by an LLM to use Joi for validation instead in the following manner:
```
const Joi = require('joi');

const jobSchema = Joi.object({
    title: Joi.string().required(),
    type: Joi.string().valid("Full-time", "Part-time", "Contract").required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    salary: Joi.string().required(),
    company: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        contactEmail: Joi.string().email().required(),
        contactPhone: Joi.string().required()
    }).required()
});
```
Apparently this is better for for example data integrity and security as well as. Frankly this is not a high priority for us for this assignment
or for our project at the moment. This is something we might look into further down the line.

Example 3: Security concerns.
In our code we return the entire the entire user object upon login like this:
```
res.status(200).json({ user, token });
```
This is a security concern since we are returning sensitive data such as the crypted password and data that might not be needed and therefore sent unnecessarily
```
res.status(200).json({ user: { id: user._id, name: user.name, email: user.email }, token });
```
This is how we were suggested to do it instead, which is a similar approach to what we use in our project where we only return the id of the user and the authentication token. For convenience sake we did not include this in the coding marathon as it was not necessary for our test project.

Example 4: Reducing database interactions.
In our code when creating a new user we first check if there already is a user with the given email in our database with User.findOne and then create it with User.create:
```
const signupUser = async (req, res) => {
    const { name, email, password, phone_number, gender, date_of_birth, membership_status } = req.body;
    try {
        if (!name || !email || !password || !phone_number || !gender || !date_of_birth || !membership_status) {
            throw error('Please enter all fields');
        }
        if (!validator.isEmail(email)) {
            throw error('Email is not valid');
        }
        if (!validator.isStrongPassword(password)) {
            throw error('Password is not strong enough');
        }

        const exists = await User.findOne({ email});
        if (exists) {
            throw error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hash, phone_number, gender, date_of_birth, membership_status });

        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
```
However we were suggested to handle this in a single try-catch block where we don't first search for a user specifically and just throw an error if the user already exists as the model already should refuse to create an user with a matching email as it is required to be unique. This is the example code we were given and this is an approach we might consider in our project:
```
try {
  const user = await User.create({ name, email, password: hash, phone_number, gender, date_of_birth, membership_status });
  const token = createToken(user._id);
  res.status(201).json({ email, token });
} catch (error) {
  if (error.code === 11000) {
    return res.status(400).json({ message: "Email already exists" });
  }
  res.status(500).json({ message: "Server error" });
}
```

And at last the explanation of the following code:
```
    jobSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
    });
```
Firstly this code creates a JSON output based off the schema as the frontend cannot work with the schema object, the "virtuals:true" means virtual properties are included. Then in this code the _id of the schema is transformed into id in the json output for this is what the frontend expects instead of _id. Following this it deletes the _id field in the json output as its not necessary. After this we remove the _v from the output as this is a internal mongoose version key which is not useful to us.