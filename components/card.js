app.component('card', {
    props: ['client_name', 'project_description', 'project_owner', 'key', 'project_id'],
    template:
      /*html*/
      `
      <div class="card" 
        @click="activate_card" 
        :draggable="[edit_title_status ? false : [edit_description_status ? false : true]]"> 
        <div class="card-body">
            <div class="dropdown card-options">
                <button class="btn-options" type="button" data-toggle="dropdown" @click="delete_project">
                    <i class="material-icons">clear</i>
                </button>
            </div>
            <div v-show = "edit_title_status==false" class="card-title" @dblclick="edit_title">
                <h6>{{current_client_name}}<!-- img class="avatar" src="./assets/img/Jardines.jpg" --></h6></div>
            <input v-show = "edit_title_status==true" class="card-title" v-model="current_client_name" @keyup.enter = "finish_edit_title" @blur = "finish_edit_title">
            <div v-show = "edit_description_status==false" class="card-subtitle" @dblclick="edit_description">{{current_project_description}}</div>
            <input v-show = "edit_description_status==true" class="card-subtitle" v-model="current_project_description" @keyup.enter = "finish_edit_description" @blur = "finish_edit_description">
            <div class="avatars">
                <div data-toggle="tooltip" @click="show_owner_option">
                    <img class="avatar" :src="owner_image" :title="project_owner">
                </div>
            </div>
        </div>
      </div>
    `,
    methods: {
        activate_card() {
            this.$emit('active_card_changed', this.current_project_id)
        },
        edit_title() {
            this.edit_title_status=true
        },
        edit_description() {
            this.edit_description_status=true
        },
        finish_edit_title() {
            this.edit_title_status=false
            this.activate_card() 
            this.$emit('title_edited', this.current_client_name)         
        },
        finish_edit_description() {
            this.edit_description_status=false
            this.activate_card()
            this.$emit('description_edited', this.current_project_description)
        },
        delete_project() {
            this.$emit('project_deleted')
        },
        show_owner_option() {
            console.log("test")
        }
    },
    data() {
        return{
            edit_title_status: false,
            edit_description_status: false,
            current_client_name: this.client_name,
            current_project_description: this.project_description,
            current_project_owner: this.project_owner,
            current_project_id:this.project_id
        }
    },
    computed: {
        owner_image() {
            return "./assets/img/"+this.project_owner+".jpg" 
        }
    }
  })