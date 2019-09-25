<script>
    import AutoPatch from './AutoPatch.svelte'
	import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()


    export let article = {}

    function createAction(articleId) {
        console.log(`Create action for ${articleId}`)
    }

    function remove() {
        dispatch('remove', {_id: article._id})
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
            

        <br>
        <div class="w3-button w3-border w3-round w3-right addButton" on:click="{() => createAction(article._id)}">
            +1 <i class="fas fa-star"></i>
        </div>

    </div>
    <br>
</div>