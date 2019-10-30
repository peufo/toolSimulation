<script>
    import AutoPatch from './AutoPatch.svelte'
	import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    export let article = {}
    export let actions = []
    export let params = []
    export let measures = []

    function createAction() {
        dispatch('createAction', {_id: article._id})
    }

    function remove() {
        dispatch('remove', {_id: article._id})
    }

    function removeAction(id) {
        dispatch('removeAction', {_id: id})
    }

    function createFeature(actionId) {
        let index = actions.map(a => a._id).indexOf(actionId)
        if (index != -1) {
            actions[index].features = [...actions[index].features, {
                label: '',
                origine: '',
                mesure: '',
                nominal: '',
                params: [],
                measures: [],
                tolerance: null,
                representation: 'without'
            }]
        }
    }

    function removeFeature(actionId, featureIndex) {
        let index = actions.map(a => a._id).indexOf(actionId)
        if (index != -1) {
            actions[index].features.splice(featureIndex, 1)
            actions = actions
        }
    }

    function createParams(actionId, featureIndex) {
        let index = actions.map(a => a._id).indexOf(actionId)
        if (index != -1) {
            actions[index].features[featureIndex].params = [...actions[index].features[featureIndex].params, params[0]._id]
        }
    }

    function createMeasures(actionId, featureIndex) {
        let index = actions.map(a => a._id).indexOf(actionId)
        if (index != -1) {
            actions[index].features[featureIndex].measures = [...actions[index].features[featureIndex].measures, measures[0]._id]
        }
    }

</script>

<div class="w3-card w3-padding w3-round w3-margin-top w3-border w3-margin-left" style="position: relative;">
   
   <AutoPatch source="{`metaArticle${article._id}`}" body={article} path="articles" />
    <div id="{`metaArticle${article._id}`}">
        <i class="fa fa-times w3-right w3-large" on:click={remove}></i>
        <input class="w3-input" type="text" bind:value={article.label} placeholder="Nom">
    </div>

    <div class="w3-border w3-padding w3-round w3-margin-top">

        <!-- Title-->
        <div class="title w3-center">
            <span><i class="fas fa-star"></i> Actions</span>
        </div>
            
        <!-- Actions -->
        {#each actions.filter(act => act.article == article._id).sort((a, b) => a.position - b.position) as action, i}

            <AutoPatch source="{`metaAction${action._id}`}" body={action} path="actions" />
            <div  id="{`metaAction${action._id}`}" class="w3-card w3-padding w3-round w3-margin-top w3-border" style="position: relative;">
                
                <i class="fa fa-times w3-right w3-large" on:click="{() => removeAction(action._id)}"></i>
                
                <input class="w3-input w3-left" type="number" bind:value={action.position} placeholder="Position" style="width: 80px;">
                <input class="w3-input" type="text" bind:value={action.label} placeholder="Nom" style="margin-left: 90px;">

                <!-- Features (caractéristique) -->
                <div class="w3-border w3-padding w3-round w3-margin-top">
                    <!-- Title -->
                    <div class="title w3-center"><span><i class="fas fa-stamp"></i> Caractéristiques</span></div>

                    {#each action.features as feature, i}

                        <div class="w3-card w3-row w3-border w3-padding w3-round w3-margin-top">

                            <i class="fa fa-times w3-right w3-large" on:click="{() => removeFeature(action._id, i)}"></i>

                            <div class="w3-row">
                                <div class="w3-col s2">
                                    <input class="w3-input" type="text" bind:value={feature.label} placeholder="Label">
                                </div>
                                <div class="w3-col s2">
                                    <input class="w3-input" type="text" bind:value={feature.origine} placeholder="Réferentiel">
                                </div>
                                <div class="w3-col s2">
                                    <input class="w3-input" type="text" bind:value={feature.mesure} placeholder="Mesure">
                                </div>
                                <div class="w3-col s2">
                                    <input class="w3-input" type="text" bind:value={feature.nominal} placeholder="Nominal">
                                </div>
                                <div class="w3-col s2">
                                    <input class="w3-input" type="number" bind:value={feature.tolerance} placeholder="Tolérance">
                                </div>
                                <div class="w3-col s2">
                                    <select class="w3-input" style="width: 80px;" bind:value={feature.representation}>
                                        <option value="SPC">SPC</option>
                                        <option value="without">Sans</option>
                                    </select>
                                </div>
                            </div>

                            <div class="w3-row">
                                <div class="w3-col s6">
                                    <div class="w3-border w3-padding w3-round w3-margin-top">

                                        <!-- Title-->
                                        <div class="title w3-center"><span><i class="far fa-edit"></i> Paramètres</span></div>
                                        
                                        <!-- Content -->
                                        {#each feature.params as fParam}
                                            <select class="w3-input " bind:value={fParam}>
                                            {#each params as param}
                                                <option value="{param._id}">{param.label}</option>
                                            {/each}
                                            </select>
                                        {/each}
                                        

                                        <!-- Add Button-->
                                        <br>
                                        <div class="w3-button w3-border w3-round w3-right addButton" on:click="{() => createParams(action._id, i)}">
                                            +1 <i class="far fa-edit"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="w3-col s6">
                                    <div class="w3-border w3-padding w3-round w3-margin-top w3-margin-left">

                                        <!-- Title-->
                                        <div class="title w3-center"><span><i class="fas fa-ruler"></i> Mesures</span></div>

                                        <!-- Content -->
                                        {#each feature.measures as fMeasure}
                                            <select class="w3-input " bind:value={fMeasure}>
                                            {#each measures as measure}
                                                <option value="{measure._id}">{measure.label}</option>
                                            {/each}
                                            </select>
                                        {/each}

                                        <!-- Add Button-->
                                        <br>
                                        <div class="w3-button w3-border w3-round w3-right addButton" on:click="{() => createMeasures(action._id, i)}">
                                            +1 <i class="fas fa-ruler"></i>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                        
                    {/each}       

                    <br>

                    <div class="w3-button w3-border w3-round w3-right addButton" on:click="{() => createFeature(action._id)}">
                        +1 <i class="fas fa-stamp"></i>
                    </div>
                </div>
                <br>

            </div>

        {/each}

        <br>
        <div class="w3-button w3-border w3-round w3-right addButton" on:click={createAction}>
            +1 <i class="fas fa-star"></i>
        </div>

    </div>
    <br>
</div>

