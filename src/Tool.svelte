<script>
    import AutoPatch from './AutoPatch.svelte'
	import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()
    
    export let tools = []
    export let tool = {}

    let unites = ['mm', 'bool', 'eval']

    function remove() {
        dispatch('remove', {_id: tool._id})
    }

    function createChild() {
        dispatch('createChild', {_id: tool._id})
    }

</script>

<div class="w3-card w3-padding w3-round w3-margin-top w3-border" style="position: relative;">

    <!-- Meta-->
    <AutoPatch source="{`metaTool${tool._id}`}" body={tool} path="tools" />
    <div id="{`metaTool${tool._id}`}" class="w3-row">

        <i class="fa fa-times w3-right w3-large" on:click={remove}></i>
        <input class="w3-input" type="text" bind:value={tool.label} placeholder="Nom">
        <!-- Parametres -->
        <div class="w3-col m6">
            <div class="w3-border w3-padding w3-round w3-margin-top">
                
                <!-- Title-->
                <div class="title w3-center"><span><i class="far fa-edit"></i> Paramètres</span></div>

                <table style="max-width: 350px; margin: auto;">
                {#each tool.params as param}
                    <tr>
                        <td>
                            <input class="w3-input" type="text" bind:value={param.label} placeholder="Mon paramètre">
                        </td>
                        <td>
                            <input style="width: 80px; text-align: center;" class="w3-input" type="number" bind:value={param.value} placeholder="Valeur">
                        </td>
                        <td>
                            <select class="w3-input" style="width: 80px;" bind:value={param.unite}>
                                {#each unites as unite}
                                    <option value={unite}>{unite}</option>
                                {/each}
                            </select>
                        </td>
                    </tr>
                {/each}        
                </table>

                <!-- Add Button-->
                <br>
                <div class="w3-button w3-border w3-round w3-right addButton" on:click="{() => tool.params = [...tool.params, {label: '', value: null, unite: 'mm'}]}">
                    +1 <i class="far fa-edit"></i>
                </div>

            </div>
        </div>

        <!-- Mesures -->
        <div class="w3-col m6">
            <div class="w3-border w3-padding w3-round w3-margin-top w3-margin-left">

                <!-- Title-->
                <div class="title w3-center"><span><i class="fas fa-ruler"></i> Mesures</span></div>

                <table style="width: 300px;">
                {#each tool.measures as measure}
                    <tr>
                        <td>
                            <input class="w3-input" type="text" bind:value={measure.label} placeholder="Ma mesure">
                        </td>
                        <td>
                            <select class="w3-input" style="width: 80px;" bind:value={measure.unite}>
                                {#each unites as unite}
                                    <option value={unite}>{unite}</option>
                                {/each}
                            </select>
                        </td>
                    </tr>
                {/each}
                </table>

                <!-- Add Button-->
                <br>
                <div class="w3-button w3-border w3-round w3-right addButton" on:click="{() => tool.measures = [...tool.measures, {label: '', value: null, unite: 'mm'}]}">
                    +1 <i class="fas fa-ruler"></i>
                </div>
            </div>
        </div>

    </div>


    <!-- Child tools -->
    <div class="w3-border w3-padding w3-round w3-margin-top">
        <!-- Title-->
        <div class="title w3-center"><span><i class="fas fa-robot"></i> Outils</span></div>

        {#each tools.filter(t => t.root == tool._id) as child}
            <svelte:self bind:tool={child} bind:tools on:remove on:createChild/>
        {/each}
        <br>

        <div class="w3-button w3-border w3-round w3-right addButton" on:click={createChild}>
            +1 <i class="fas fa-robot"></i>
        </div>
    </div>
    <br>
   
</div>

<style>

</style>