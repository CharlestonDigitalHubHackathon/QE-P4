# QE-P4

This project was created for the [hackathon](https://github.com/CharlestonDigitalHubHackathon/General-Info) at the Booz Allen Hamilton Charleston Digital Hub on February 23, 2019.

The prompt for this hackathon is to use a [provided data set](https://github.com/charlestondigitalhubhackathon/Quality-Education) to help solve one of the UN's Sustainable Development Goals - Quality Education. The data set provided can be queried in a [web UI](http://datatopics.worldbank.org/education/wQueries/qfull) and includes statistics in the topics of Enrollments, Out-of-School Children, Repetition, Completion, Gender, Teachers, Education Expenditures, Learning Outcomes, Educational Attainment, Education Equality, Literacy, Population, Labor, and EMIS.

We designed a game that will let students have fun while learning and also providing students in need with supplies. There are many schools in need who are sponsored by a school that is more well off. The sponsor school will raise money to purchase supplies for the school in need, and these classes often write letters to each other or send video chats. When a sponsoring teacher registers, they will give a link to a wishlist for the school they are sponsoring. They will have their students register for the game. When the students register, they choose a location in the world (limited to 4 countries for the hackathon but intended to let you choose anywhere) and the difficulty of the game is dependent upon where you choose. Your character will have traits generated based on the data from the area. For example, if you choose China, you have a 53.1% chance of being male. If you choose Zimbabwe and are female, you have an 11.7% chance of being illiterate. These traits affect your choices in the game. We would like to expand the game to use additional data such as air quality to affect other traits.

We created a single adventure for the hackathon but intend this to work for many adventures. The plot of the adventure we created involves being abducted by aliens and attempting to escape their spacecraft. You will have a tough time trying to escape if you can't read the exit sign.

When a student progresses in the game, they earn money that they can cash out to purchase wishlist items for the school they are sponsoring. The money will come from the same place it did previously - usually a collection put together by the sponsoring teacher. This game encourages students to become involved in the fundraising and gives them a better understanding of what problems some people in the world experience that they may never have seen firsthand, such as malnutrition and illiteracy.

The idea was inspired by Christi's sister, Jenny Viets, who is a teacher in Massachusetts. Her [Amazon wishlist](https://smile.amazon.com/hz/wishlist/ls/2177GUO3D598W/) for her classroom describes her needs best:

> Help awesome kids have a warm therapeutic environment at school. I have a class of 4th and 5th graders with emotional disabilities, which means for the most part that they are children who've experienced trauma at a young age. They are so smart, so funny, incredibly resilient, and amaze me every day. They struggle to regulate their feelings and their responses to them. Our school district is full of dedicated educators and exists in a loving community. However, poverty and systemic racism have impacted the resources the students have access to. We are in the highest performing state for public education, but are one of the lowest performing districts in the country. We have made and continue to make significant progress, but no amount of effort on the part of the students can make up for lack of resources. My students and I are actively generating this list together. It's my first year with my own classroom, and I continue to invest resources, but support from you and your community is important for my students' success. Any item is appreciated and is greatly valued by our classroom community. If you can't purchase an item, please share the list with anyone who may be able to. Help these kids feel like people have noticed how hard they work! (All donations are viewed as donations to the classroom, not to the teacher. All donated items within reason will stay in the therapeutic program classrooms whether or not I am there in the future.)

She has added descriptions to many of the items explaining why they are needed. Some are very simple, a [computer mouse](https://smile.amazon.com/dp/B005EJH6RW/?coliid=I1YBQRJO43RMW3&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it) with the note "classroom desktop computer has no mouse." There are many [sensory toys](https://smile.amazon.com/dp/B07BT6MPXQ/?coliid=I2F2WVG631XBRP&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it) which have descriptions like "very helpful for our students. Many kids with trauma chew and chew and chew. Right now they chew plastic straws from juice boxes, metal ends of pencils, and other objects that can damage their teeth." There are also food items such as [nutritional shakes](https://smile.amazon.com/dp/B07FB2QJ7W/?coliid=I2B5GR7315J583&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it) "for several students whose families are food-insecure."

As this was an 8-hour hackathon, we built the game based on a single Amazon wishlist, but intended it to work for any wishlist site, including ones with better delivery systems for other countries so that this can help reach students worldwide.

You can play the game as a student [here](https://hackathon-2019-d-and-d.herokuapp.com/d-and-d/student/registration) (give it couple of seconds to load).

## Team members

* Bobby Earl
  * Website - Teacher status page
  * Website - Student registration
  * Website - Wishlist view
  * Heroku setup
* Steve Fennell
  * Student registration endpoints
* Christi Schneider
  * Character builder
  * Website - game progression
* John Lunsford
  * Story
  * Amazon wishlist integration
* Tom Schneider
  * Art

## Technology

* AWS Lambda (node.js 8)
  * The character generator is an AWS Lambda. It does not pull statistical data live, we crunched numbers for the hackathon.
  * The endpoints to register students, save game progress, and for teachers to view their students' progress are built with AWS Lambda.
* AWS API Gateway
  * The API Gateway is used to connect to AWS Lambda.
* SKY UX
  * [SKY UX](https://developer.blackbaud.com/skyux/) is an open source Angular framework. We used this because several of our developers are familiar with the UI components.
* Heroku
  * The site is hosted on Heroku and automatically deploys when changes are made to the [master branch](https://github.com/CharlestonDigitalHubHackathon/QE-P4).

## Local development

### SPA

* `nvm install`
* `npm install @blackbaud/skyux-cli`
* `npm install`
* `skyux serve`

https://host.nxt.blackbaud.com/d-and-d/student/details/5ca44550-3841-11e9-883b-f50d9fac2eb1?tid=example-teacher-id

### Character creation Lambda

This uses Christi's AWS account so you either need to get credentials to upload it, or upload it to a new Lambda, configure the API Gateway, and update the API URL.

### Students

All students: https://w6vvtstn3c.execute-api.us-east-1.amazonaws.com/prod/student