import {
  Injectable
} from '@angular/core';

import {
  Observable,
  of
} from 'rxjs';

import {
  WishItem
} from '../models/wishitem.model';

@Injectable()
export class WishlistService {

  private _title = 'Therapeutic 4th and 5th Grade Classroom';

  private _comment = '';

  private _wishlist: WishItem[] = [
    {
      'num': 1,
      'name': 'How One Little Dolphin Learned to Swim Again (Winter\'s Tail)',
      'link': 'http://www.amazon.com/dp/0545348307/?coliid=I279J2U0UVJC78&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$6.99',
      'date-added': 'Item added February 7, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': 'One student\'s favorite story: he has one book about Winter and has requested the others',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/71ljAPinLdL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 2,
      'name': 'Spiky Sensory Ring/Bracelet Fidget Toy (Pack of 3) - BPA/Phthalate/Latex-Free - Fidget Toys/Sensory Toys',
      'link': 'http://www.amazon.com/dp/B01ISA8UWI/?coliid=I2NFYD20WWJO48&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$9.99',
      'date-added': 'Item added February 7, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': 'Sensory tools are very trendy and they cause some people to roll their eyes a little but they are actually extremely helpful for my students to regulate themselves so they can be successful in class. They get worn easily and need to be replaced often',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/81pgqkDnC5L._SS135_.jpg',
      'page': 1
    },
    {
      'num': 3,
      'name': 'Hand Grip Strengthener, Finger Exerciser, Grip Strength Trainer (6 PCS)*New Material*Forearm Grip Workout, Finger Stretcher, Relieve Wrist Pain, Carpal Tunnel, Trigger Finger, Mallet Finger and More.',
      'link': 'http://www.amazon.com/dp/B078L1KZBZ/?coliid=I1VQCH2QOW2NAS&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$11.99',
      'date-added': 'Item added February 7, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': 'Sensory tools are very trendy and they cause some people to roll their eyes a little but they are actually extremely helpful for my students to regulate themselves so they can be successful in class. They get worn easily and need to be replaced often',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/71L9qfzy1ML._SS135_.jpg',
      'page': 1
    },
    {
      'num': 4,
      'name': 'HedBanz Game',
      'link': 'http://www.amazon.com/dp/B003AIM52A/?coliid=IWLELHYBTNELE&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$14.92',
      'date-added': 'Item added February 7, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': 'Favorite game of many students',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/81UxnB18+bL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 5,
      'name': 'The Bad Guys in Intergalactic Gas (The Bad Guys #5)',
      'link': 'http://www.amazon.com/dp/1338189573/?coliid=I1YNH3NR78DLBZ&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$5.99',
      'date-added': 'Item added February 7, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': 'Very popular series for my students',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/71Ogk0qbYUL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 6,
      'name': 'The Bad Guys in Mission Unpluckable (The Bad Guys #2)',
      'link': 'http://www.amazon.com/dp/0545912415/?coliid=I3OFVFY6DS2P65&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$5.99',
      'date-added': 'Item added February 7, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': '',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/71nDBp2muKL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 7,
      'name': 'The Bad Guys in Do-You-Think-He-Saurus?!: Special Edition (The Bad Guys #7)',
      'link': 'http://www.amazon.com/dp/1338189611/?coliid=I12DUQDXB5IGB7&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$6.99',
      'date-added': 'Item added February 7, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': '',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/81N3y2G3MZL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 8,
      'name': 'Skippyjon Jones Cirque de Ole',
      'link': 'http://www.amazon.com/dp/0803737823/?coliid=I29OY64XUE0ALZ&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$10.97',
      'date-added': 'Item added February 7, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': 'Favorite series of some students',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/A1jxtUtwDpL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 9,
      'name': 'Skippyjon Jones, Class Action',
      'link': 'http://www.amazon.com/dp/0425288927/?coliid=I1YJMD6MY1AZAA&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$8.82',
      'date-added': 'Item added February 7, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': '',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/A1wBurGpICL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 10,
      'name': 'The Great Bean Caper (Skippyjon Jones)',
      'link': 'http://www.amazon.com/dp/0448451670/?coliid=I1SCGSFG4CVSRO&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$3.99',
      'date-added': 'Item added February 7, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': '',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/916PdwtV1eL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 11,
      'name': 'Adjustable Soft Skipping Rope with Skin-Friendly Foam Handles for Kids, Children, Students',
      'link': 'http://www.amazon.com/dp/B07GN5BD2F/?coliid=ID99D4IR16WON&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$15.00',
      'date-added': 'Item added February 7, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '20',
      'comment': 'Our classroom jumprope broke. It was the favorite break activity of one student who also likes to jump rope when she practices spelling like Akeelah and the Bee.',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/615cg-JZvYL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 12,
      'name': 'Product Of Barcel Takis , Mini Fuego Bag , Count 25 (1.2 oz) - Chips / Grab Varieties &amp;amp; Flavors',
      'link': 'http://www.amazon.com/dp/B079398KG4/?coliid=I17S1Q0K9Q52PU&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$19.99',
      'date-added': 'Item added February 7, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': 'Very popular snack for our students.',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/51Hk3KcRVXL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 13,
      'name': 'Chew Chew Sensory Teether Necklace 4-Pack &ndash; Best for Autism, Biting and Teething Kids &ndash; Durable and Strong Silicone Chewy Toys - Chewing Pendant for Boys &amp;amp; Girls - Fidget Chewlery Necklaces',
      'link': 'http://www.amazon.com/dp/B07BT6MPXQ/?coliid=I2F2WVG631XBRP&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$11.99',
      'date-added': 'Item added February 6, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '51',
      'comment': 'Very helpful for our students. Many kids with trauma chew and chew and chew. Right now they chew plastic straws from juice boxes, metal ends of pencils, and other objects that can damage their teeth.',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/81W4MLYRPIL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 14,
      'name': 'SensaCalm Sensory Weighted Lap Pad Small Weighted Calm Blanket for Toddler, Kids, Teens &amp;amp; Adults with Anxiety, ADHD, Stress, Autism &amp;amp; Sensory Processing Disorder - Dazzling Blue - 12 x 18 inches',
      'link': 'http://www.amazon.com/dp/B01N06L35G/?coliid=IA80MWBWSG8RT&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$29.95',
      'date-added': 'Item added January 27, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '10',
      'comment': 'Very helpful for some of the students with sensory needs',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/71RUDpzdh6L._SS135_.jpg',
      'page': 1
    },
    {
      'num': 15,
      'name': 'Crayola Broad Line Washable Markers, Classpack Bulk Markers, 200 Count',
      'link': 'http://www.amazon.com/dp/B00006IFJ7/?coliid=IVY0MN9JXKB8J&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$54.40',
      'date-added': 'Item added January 27, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': 'Coloring is used for many social-emotional activities',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/81GAoOE8jTL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 16,
      'name': 'AmazonBasics 3-Button USB Wired Mouse (Black)',
      'link': 'http://www.amazon.com/dp/B005EJH6RW/?coliid=I1YBQRJO43RMW3&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$6.99',
      'date-added': 'Item added January 27, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': 'classroom desktop computer has no mouse',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/71uotBbbjNL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 17,
      'name': 'The Original Fidget Retro: The Rubberized Classic Controller Game Pad Fidget Focus Toy with 8-Fidget Functions and Lanyard - Perfect for Relieving Stress (Original Version)',
      'link': 'http://www.amazon.com/dp/B06ZYKCPWR/?coliid=I17YT00PNFOB61&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$7.29',
      'date-added': 'Item added January 27, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '75',
      'comment': 'Helpful for focus and ADHD',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/61+B0bzXsWL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 18,
      'name': 'Cyber Acoustics CA-2014 multimedia desktop computer speakers',
      'link': 'http://www.amazon.com/dp/B00008MN45/?coliid=I1YCX65O791WGC&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$12.38',
      'date-added': 'Item added January 27, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': 'For 3 separate therapeutic classrooms: difficult to hear videos and films from projector\'s speakers',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/81cONLwCNNL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 19,
      'name': 'Twitterplaza Toy Storage Bag For Baby and Kids Toys Organizer Quick Toy Mat Simple, Portable - Blue 60Inch',
      'link': 'http://www.amazon.com/dp/B06X94KQG9/?coliid=I2L6F5PUL4H98I&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$9.98',
      'date-added': 'Item added January 27, 2019',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': 'many students use legos on structured breaks.  We have no good system to clean them up quickly and currently use the teacher\'s jacket as a Lego mat.',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/81sM2gG575L._SS135_.jpg',
      'page': 1
    },
    {
      'num': 20,
      'name': 'Pressman Toys 4331-06 Harry Potter Tri-Wizard Tournament',
      'link': 'http://www.amazon.com/dp/B01LYHF6ER/?coliid=I2S48LVB6EUZFS&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$8.98',
      'date-added': 'Item added December 21, 2018',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': 'Specifically requested by 4 students',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/913DMvYfX8L._SS135_.jpg',
      'page': 1
    },
    {
      'num': 21,
      'name': 'Spalding NBA Slam Jam Over-The-Door Mini Basketball Hoop',
      'link': 'http://www.amazon.com/dp/B0085AOZIK/?coliid=I127QDRZQ9ZY83&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$31.99',
      'date-added': 'Item added December 21, 2018',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': 'Requested by 5th grade class',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/81v-KZKAoCL._SS135_.jpg',
      'page': 1
    },
    {
      'num': 22,
      'name': 'Cardinal Giant Uno Giant Game',
      'link': 'http://www.amazon.com/dp/B01FAEOL2S/?coliid=I2N0PALUE8XD37&colid=2177GUO3D598W&psc=0&ref_=lv_vv_lig_dp_it',
      'old-price': 'N/A',
      'new-price': '$19.17',
      'date-added': 'Item added December 21, 2018',
      'priority': 'medium',
      'rating': 'N/A',
      'total-ratings': '',
      'comment': 'Requested by both classes',
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/81tmgHwVyAL._SS135_.jpg',
      'page': 1
    }
  ];

  constructor() {}

  public getItems(): Observable<WishItem[]> {
    return of(this._wishlist);
  }

  public getTitle(): Observable<string> {
    return of(this._title);
  }

  public getDescription(): Observable<string> {
    return of(this._comment);
  }
}
