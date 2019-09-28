
<script>
	import { onMount } from 'svelte'
	import { getHeader } from './utils'
	import Tool from './Tool.svelte'
	import Article from './Article.svelte'

	let tools = []
	$: console.log('Tools : ', tools)

	let articles = []
	$: console.log('Articles : ', articles)

	let actions = []
	$: console.log('Actions : ', actions)


	onMount(() => {
		getTools()
		getArticles()
		getActions()
	})


	//Tools

	async function getTools() {
		let res = await fetch('/tools')
		let json = await res.json()
		tools = json
	}

	async function createTool(newTool) {
		if (!newTool.label) newTool = {label: 'Mon nouvel outil', params: [], measures: []}

		let res = await fetch('/tools', getHeader(newTool))
		let json = await res.json()
		if (json.error) {
			console.log(json.message)
		}else{
			tools = [...tools, json]
		}
	}

	function createToolChild(e) {
		let newTool = {label: 'Mon nouvel outil', params: [], measures: [], root: e.detail._id}
		createTool(newTool)
	}

	async function removeTool(e) {
		let _id = e.detail._id
		let res = await fetch(`/tools/remove`, getHeader({_id}))
		let json = await res.json()
		if (json.error) {
			console.log(json.message)
		}else {
			let index = tools.map(t => t._id).indexOf(_id)
			if (index != -1) {
				tools.splice(index, 1)
				tools = tools
			}
		}
	}


	//Articles
	async function getArticles() {
		let res = await fetch('/articles')
		let json = await res.json()
		articles = json
	}

	async function createArticle(e) {
		let res = await fetch('/articles', getHeader({}))
		let json = await res.json()
		if (json.error) {
			console.log(json.message)
		}else{
			articles = [...articles, json]
		}
	}

	async function removeArticle(e) {
		let _id = e.detail._id
		let res = await fetch(`/articles/remove`, getHeader({_id}))
		let json = await res.json()
		if (json.error) {
			console.log(json.message)
		}else {
			let index = articles.map(t => t._id).indexOf(_id)
			if (index != -1) {
				articles.splice(index, 1)
				articles = articles
			}
		}
	}

	//Actions
	async function getActions() {
		let res = await fetch('/actions')
		let json = await res.json()
		actions = json
	}

	async function createAction(e) {
		let res = await fetch('/actions', getHeader({article: e.detail._id}))
		let json = await res.json()
		if (json.error) {
			console.log(json.message)
		}else{
			actions = [...actions, json]
		}
	}

	async function removeAction(e) {
		let _id = e.detail._id
		let res = await fetch(`/actions/remove`, getHeader({_id}))
		let json = await res.json()
		if (json.error) {
			console.log(json.message)
		}else {
			let index = actions.map(a => a._id).indexOf(_id)
			if (index != -1) {
				actions.splice(index, 1)
				actions = actions
			}
		}
	}

</script>

<div class="w3-padding w3-row">

	<div class="w3-col m6">
		<div class="w3-center">
			<span class="w3-opacity"><i class="fas fa-robot"></i> Outils</span><br>
		</div>

		{#each tools.filter(t => !t.root) as tool}
			<Tool bind:tool bind:tools on:remove={removeTool} on:createChild={createToolChild}/>		
		{/each}

		<div class="w3-button w3-border w3-round w3-margin-top w3-right" on:click={createTool}>
			+1 <i class="fa fa-robot"></i>
		</div>
	</div>

	<div class="w3-col m6">
		<div class="w3-center">
			<span class="w3-opacity"><i class="fas fa-cube"></i> Articles</span><br>
		</div>

		{#each articles as article}
			<Article bind:article bind:actions on:remove={removeArticle} on:createAction={createAction} on:removeAction={removeAction}/>		
		{/each}

		<div class="w3-button w3-border w3-round w3-margin-top w3-right" on:click={createArticle}>
			+1 <i class="fas fa-cube"></i>
		</div>
	</div>

</div>