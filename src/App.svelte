
<script>
	import { onMount } from 'svelte'
	import { getHeader } from './utils'
	import Tool from './Tool.svelte'

	//A mettre dans ./Tools.svelte ?
	let tools = []
	$: console.log(tools)

	onMount(() => {
		getTools()
	})

	async function getTools() {
		let res = await fetch('/tools')
		let json = await res.json()
		tools = json
	}

	async function create(newTool) {
		if (!newTool.label) newTool = {label: 'Mon nouvel outil', params: [], measures: []}

		let res = await fetch('/tools', getHeader(newTool))
		let json = await res.json()
		if (json.error) {
			console.log(json.message)
		}else{
			tools = [...tools, json]
		}
	}

	function createChild(e) {
		console.log(e)
		let newTool = {label: 'Mon nouvel outil', params: [], measures: [], root: e.detail._id}
		create(newTool)
	}

	async function remove(e) {
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

</script>

<div class="w3-padding">
	<span class="w3-opacity"><i class="fas fa-robot"></i> Outils</span><br>

	{#each tools.filter(t => !t.root) as tool}
		<Tool bind:tool bind:tools on:remove={remove} on:createChild={createChild}/>		
	{/each}

	<div class="w3-button w3-border w3-round w3-margin-top w3-right" on:click={create}>
		+1 <i class="fa fa-robot"></i>
	</div>
</div>