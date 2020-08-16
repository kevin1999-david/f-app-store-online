const { Router } = require('express');
const router = Router();
const stripe = require("stripe")('sk_test_51GvyGwB9QoZvlLmGEm3f2HuW8XPn25wj5PrNeH6MbCDCrIQiHuOxbRA9JJe9qIxQL2ADgFkzzxD66vvpJgsbNUKM002iSIBTdH');
router.get('/', (req, res) => {
    res.render('index');
});


router.post('/checkout', async (req, res) => {

    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });
    const charge = await stripe.charges.create({
        amount: '3000',
        currency: 'usd',
        customer: customer.id,
        description: 'Video Editing Software'
    });
    console.log(charge.id);
    //Finally
    res.render('download');
});
module.exports = router;