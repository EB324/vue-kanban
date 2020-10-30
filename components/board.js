  app.component('board', {
    template:
      /*html*/
      `
      <div class="kanban-col" 
        v-for="status in status_list">
        <div class="card-list"
            @drop='on_drop($event, status)' 
            @dragover.prevent 
            @dragenter.prevent>
            <div class="card-list-header"><h6>{{status + " (" + projects[status].length + ")"}}</h6></div>
            <div class="card-list-body">
                <card v-for="project in projects[status]" 
                    :key="project.id"
                    :project_id="project.id"
                    :client_name="project.client_name" 
                    :project_description="project.project_description" 
                    :project_owner="project.project_owner"
                    @active_card_changed="update_project_id"
                    @project_deleted="remove_project(project)"
                    @title_edited="set_client_name"
                    @description_edited="set_project_description"
                    @dragstart="start_drag($event, project)"
                    @dragend="stop_drag($event)">
                </card>
            </div>
            <div class="card-list-footer">
                <button class="btn btn-link btn-sm text-small" @click="add_project(status)"> Add project </button>
            </div>
        </div>
      </div>

    `,
    data(){
        return{
            status_list:['Live', 'Proposal sent', 'Contact', 'BD'],
            current_project_id: 1,
            new_client_name: "",
            project_details:[
                {   id: 1,
                    status: 'Contact',
                    client_name:'Client name 1',
                    project_description:'Test description',
                    project_owner:'A',
                    logo:'',
                    active: true
                },
                {   id: 2,
                    status: 'BD',
                    client_name:'Client name 2',
                    project_description:'Test description',
                    project_owner:'B',
                    logo:'',
                    active: true
                },
                {   id: 3,
                    status: 'Proposal sent',
                    client_name:'Client name 3',
                    project_description:'Test description',
                    project_owner:'C',
                    logo:'',
                    active: true
                },
                {   id: 4,
                    status: 'Live',
                    client_name:'Client name 4',
                    project_description:'Test description',
                    project_owner:'D',
                    logo:'',
                    active: true
                }           
            ]
            
        }
    },
    computed: {
        live_list() {
            return this.project_details.filter(project_detail => project_detail.status === "Live" && project_detail.active===true)
        },
        proposal_list() {
            return this.project_details.filter(project_detail => project_detail.status === "Proposal sent" && project_detail.active===true)
        },
        contact_list() {
            return this.project_details.filter(project_detail => project_detail.status === "Contact" && project_detail.active===true)
        },
        bd_list() {
            return this.project_details.filter(project_detail => project_detail.status === "BD" && project_detail.active===true)
        },
        projects() {
            return {
            'Live':this.live_list,
            'Proposal sent':this.proposal_list,
            'Contact':this.contact_list,
            'BD':this.bd_list }               
        },
        current_client_name(){
            return this.project_details[this.current_project_id-1].client_name //前提：index=id-1
        }
    }, 
    methods: {
        update_project_id(id) {
            this.current_project_id = id
            console.log("Current active board: " + this.current_project_id)
        },
        add_project(status) {
            this.project_details.push({
                id: this.project_details.length+1,
                status: status,
                client_name:'Client '+ (this.project_details.length+1),
                project_description:'project description',
                project_owner:'default_owner',
                logo:'',
                active: true
            })
        },
        remove_project(project) {
            const index = this.project_details.indexOf(project)
            this.project_details[index].active=false
        },
        set_client_name(current_client_name) {
            this.project_details[this.current_project_id-1].client_name=current_client_name //从子component收到新名字然后改这里的数据
        },
        set_project_description(current_project_description) {
            this.project_details[this.current_project_id-1].project_description=current_project_description //从子component收到新名字然后改这里的数据
        },
        start_drag: (evt, project) => {
            evt.target.style.opacity = 0.5
            evt.dataTransfer.dropEffect = 'move'
            evt.dataTransfer.effectAllowed = 'move'
            evt.dataTransfer.setData('projectID', project.id)
        },
        stop_drag: (evt) => {
            evt.target.style.opacity = 1
        },
        on_drop (evt, status) {
            evt.target.style.background = ""
            evt.target.style.opacity = 1
            const projectID = evt.dataTransfer.getData('projectID')
            const project = this.project_details.find(project => project.id == projectID)
            project.status = status
        }
    }
  })