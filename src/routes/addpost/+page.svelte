<script lang="ts">
    import { enhance } from '$app/forms';
    import nextIcon from '$lib/assets/icons/next.svg'
    import type {PostForm, Role} from '../../baseTypes'
    import { base } from '$app/paths';
    
    import {postPageOne as PageOne, postPageTwo as PageTwo, previewPage as PreviewPage} from '$lib/components'
	import { page } from '$app/state';

    
    let initPageNum: number | null = 1
    

    let pageNum = $state(initPageNum)
    let totalForm: PostForm = $state({role: 'canvas', tag: []})

    function handleNext(){
        pageNum += 1
    }
    function handlePrevious(){
        pageNum -= 1
    }
    function handleFormChange(input: 'tag' | 'image' | 'desc' | 'role', value: string){
        console.log("CHANGED", input, value)
        if(input === 'tag'){
            totalForm['tag'].push(value)
        }else if(input === 'role'){
            totalForm['role'] = value as Role
        }
        else{
            totalForm[input] = value;
        }
    }
    function handleSubmit(event: { action: URL; formData: FormData; formElement: HTMLFormElement; controller: AbortController; submitter: HTMLElement | null; cancel: () => void; }){
        const defaultForm = event.formData
        defaultForm.delete('tags')

        if(totalForm['image']){
            defaultForm.append('image', totalForm['image'])
        }
        
        if(totalForm['tag']){
            defaultForm.append('tags', JSON.stringify(totalForm['tag']))
        }
    }
</script>

<div class="postCreationContainer">
    <div class="header">
        <div class="headerText">
            <h3>CREATE POST</h3>
        </div>
        <div class="pageNumber">
            {pageNum}/3
        </div>
    </div>
    <div class="body">
        {#if pageNum === 1}
        <div><PageOne formChange={handleFormChange}/></div>
        {:else if pageNum === 2}
        <div></div>
        {:else}
        <div></div>
        {/if}
    </div>
    <div class="navigationButton">
        <button class="nextStep" disabled={!totalForm["image"]}>NEXT STEP<img src={`${base}/icons/right-arrow.svg`} alt="right-arrow" /></button>
    </div>
</div>

<style>
    .nextStep img {
        margin-left: 5px;
        -webkit-filter: invert(100%);
        filter: invert(100%);
    }
    .nextStep {
        width: 100%;
        border-radius: 0;
        border: 3px solid black;
        box-shadow: 3px 3px black;
        height: 50px;
        font-weight: bolder;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #22c55e;
        color: white;
    }
    .nextStep:disabled {
        background-color: #d1d5db;
        color: #4b5563;
    }
    .nextStep:disabled img {
        filter: invert(0%);
    }
    .navigationButton {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80%;
    }
    .body {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pageNumber {
        background-color: white;
        padding: 5px;
        border: 2px solid black;
        box-shadow: 2px 2px black;
        margin-right: 10px;
        font-size: small;
        font-weight: bolder;
    }
    .headerText {
        font-weight: bolder;
        font-size: .9em;
        letter-spacing: -.2em;
        padding: 5px;
    }
    .header {
        background-color: #f472b6;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        border-bottom: 3px solid black;
        width: 100%;
    }
    .postCreationContainer {
        width: 375px;
        background-color: white;
        min-height: 750px;
        border: 5px solid black;
        box-shadow: 5px 5px black;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>