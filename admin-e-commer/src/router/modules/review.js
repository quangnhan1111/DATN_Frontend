/** When your routing table is too long, you can split it into small modules**/

import Reviews from "../../views/review/Reviews";

const review = [
  {
    path: '/reviews',
    name: 'Reviews',
    component: Reviews
  },
]

export default review
