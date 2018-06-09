// Get a reference to the database service
const database = firebase.database();
const messageRef=database.ref("db_test1");

new Vue({
	el:"#div_comment",
	data:{
		messageText:'',
		messages:[],
		name:'Aung',
		editText:null
	},
	methods:{
		storeMessage:function(){
			messageRef.push({
				comment_user:this.messageText,
				name_user:this.name
			})
			this.messageText=''
			//console.log(this.messages);
		},
		deleteMessage:function(messages){
			messageRef.child(messages.comment_id).remove()
		},
		editMessage:function(messages){
			this.editText=messages
			this.messageText=messages.comment_user
			//console.log(messages);
		},
		cancleMessage:function(messages){
			this.editText=null
			this.messageText=''
		},
		updateMessage:function(messages){
			messageRef.child(this.editText.comment_id).update({comment_user:this.messageText})
			this.cancleMessage()
		}

	},
	created(){
		messageRef.on('child_added',sanpshot=>{
			//this.messages.push(sanpshot.val())
			this.messages.push({...sanpshot.val(),comment_id:sanpshot.key})
			//console.log(sanpshot.val());
		})
		messageRef.on('child_removed',sanpshot=>{
			const deleteText=this.messages.find(messages=>messages.comment_id == sanpshot.key)
			const index=this.messages.indexOf(deleteText)
			this.messages.splice(index,1)
		})
		messageRef.on('child_changed',sanpshot=>{
			const updateText=this.messages.find(messages=>messages.comment_id == sanpshot.key)
			updateText.comment_user=sanpshot.val().comment_user
		})


	}
})