import {SEND_FORM, START, SUCCESS, FAIL} from '../constants.js'

import axios from 'axios'

export function sendForm(values){

	return ( (dispatch) => {
		dispatch({
		 	type: SEND_FORM
		})

		setTimeout(() => {
 			axios
				.post('/wp-admin/admin-post.php', values)
  			.then(function (response) {
  			})
  			.catch(function (error) {
  			});
			},
			1000)
		}

	)
}