const formats = [
    {
        subject: "School Aboard",
        body: `<p>Welcome aboard {school_name}! Thank you for joining this exciting mission to deep space on the Enterprise flight, in partnership with Celestis Spaceflights and MicroPets launching late 2022!</p><br>Here is the promo code for your students to use when submitting their drawings:<br><b>{promo_code}</b><p>This code validate from {start} to {end}</p>`
    },
    {
        subject: "Student Registration",
        body: `<p>Dear Student,</p><br><p>Welcome aboard astronaut! We are so happy to have you join this exciting mission to deep space on the Enterprise Flight, in partnership with Celestis Spaceflights and MicroPets launching late 2022!</p><br>Here is the promo code for your students to use when submitting their drawings:<br><b>{promo_code}</b>`
    },
    {
        subject: "Student Image Declined",
        body: `<p>Hello astronaut,</p><br><p>Houston, we have a problem! Your image could not be accepted. Please follow our guidelines when submitting your image and try again.</p>`
    },
    {
        subject: "Student Image Accepted",
        body: `<p>Hello astronaut,</p><br><p>Your image has been received and accepted. You are now a part of this historical mission to deep space! The Enterprise Flight will launch heading to deep space in late 2022!</p>`
    }
];

module.exports = formats