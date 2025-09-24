<script lang="ts">
    import type {PostForm, Role} from '../../baseTypes'
    import { base } from '$app/paths';
    
    import {postPageOne as PageOne, postPageTwo as PageTwo, previewPage as PreviewPage} from '$lib/components'
	import { enhance } from '$app/forms';

    let initPageNum: number | null = 1
    
    let pageNum = $state(initPageNum)
    let totalForm: PostForm = $state({role: 2, tag: []})

    function handleNext(){
        pageNum += 1
    }
    function handlePrevious(){
        pageNum -= 1
    }
    function handleFormChange(input: 'tag' | 'image' | 'description' | 'role' | 'aspectRatio', value: string){
        
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
        console.log('FORM', defaultForm)
        defaultForm.delete('tags')

        if(totalForm['image']){
            defaultForm.append('image', totalForm['image'])
        }
        
        if(totalForm['tag']){
            defaultForm.append('tags', JSON.stringify(totalForm['tag']))
        }
        if(totalForm['description']){
            defaultForm.append('description', totalForm['description'])
        }
        if(totalForm['role']){
            defaultForm.append('role', totalForm['role'].toString())
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
    <form method="POST" use:enhance={(event) => handleSubmit(event)} action="?/upload">
        <div class="body">
            {#if pageNum === 1}
            <div><PageOne formChange={handleFormChange} image={totalForm['image']}/></div>
            {:else if pageNum === 2}
            <div><PageTwo formChange={handleFormChange} tags={totalForm["tag"]}/></div>
            {:else}
            <div class="previewPage"><PreviewPage formData={{totalForm}}/></div>
            {/if}
        </div>
        <div class="buttons">
            {#if pageNum === 1}
            <div class="navigationButton">
                <button onclick={handleNext} class="nextStep" disabled={!totalForm["image"]}>NEXT STEP<img src={`${base}/icons/right-arrow.svg`} alt="right-arrow" /></button>
            </div>
            {:else if pageNum === 2}
            <div class="button">
                <button onclick={handlePrevious} class="backButton"><img src={`${base}/icons/right-arrow.svg`} alt="left-arrow" />BACK</button>
            </div>
            <div class="button">
                <button onclick={handleNext} class="previewButton">PREVIEW <img src={`${base}/icons/right-arrow.svg`} alt="right-arrow"/></button>
            </div>
            {:else}
            <div class="submitButtons">
                <div class="postSubmit">
                    <button class="previewButton" id="postButton" type="submit"><img src={`${base}/icons/rocket.svg`} alt="clapping"/>POST IT NOW</button>
                </div>
                <div class="backToEdit">
                    <button class="backButton" onclick={handlePrevious}><img src={`${base}/icons/right-arrow.svg`} alt="back" />BACK TO EDIT</button>
                </div>
            </div>
            {/if}
        </div>
    </form>
</div>

<style>
    form {
        width: 100%;
    }
    .submitButtons {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-bottom: 10px;
    }
    .submitButtons button {
        height: 50px;
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .backToEdit img {
        filter: invert();
    }
    #postButton img {
        filter: invert();
        margin-right: 5px;
    }
    #postButton {
        background-color: #ef4444;
    }
    .previewPage {
        width: 100%;
    }
    .backButton img {
        padding-left: 5px;
        transform: rotate(180deg);
    }
    .previewButton img {
        margin-left: 5px;
    }
    .button img {
        filter: invert();
    }
    .button {
        width: 48%;
        height: 100%;
    }
    .previewButton {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: 0;
        border: 3px solid black;
        box-shadow: 3px 3px black;
        background-color: #22c55e;
        color: white;
        font-weight: bolder;
    }
    .backButton {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: 0;
        border: 3px solid black;
        box-shadow: 3px 3px black;
        background-color: #6b7280;
        color: white;
        font-weight: bolder;
    }
    .buttons {
        display: flex;
        width: 80%;
        justify-content: space-between;
        height: 50px;
    }
    .buttons button:active {
        box-shadow: none;
        transform: translateX(3px) translateY(3px);
    }
    .buttons:has(.submitButtons){
        width: 95%;
        height: 100%;
        padding-bottom: 10px;
    }
    .nextStep img {
        margin-left: 5px;
        -webkit-filter: invert(100%);
        filter: invert(100%);
    }
    .nextStep:active {
        box-shadow: none;
        transform: translateX(3px) translateY(3px);
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
        width: 100%;
    }
    .nextStep:disabled img {
        filter: invert(0%);
    }
    .navigationButton {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .body {
        width: 100%;
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
    .postCreationContainer form {
        display: flex;
        flex-direction: column;
        align-items: center;
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