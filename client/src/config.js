
let config = {
    __DEGUGGING__:true,
    backEndServer:'https://express-react-boilerplate-back.herokuapp.com',
    alertD: function(...args) {
		if (this.__DEGUGGING__) {
			args.map((arg) => {
				console.log(arg);
			});
		}
	},
}



export default config