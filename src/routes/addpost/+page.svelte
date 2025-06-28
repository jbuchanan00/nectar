<script lang="ts">
    import { enhance } from '$app/forms';
    import nextIcon from '$lib/assets/icons/next.svg'
    import type {PostForm} from '../../baseTypes'
    
    import {postPageOne as PageOne, postPageTwo as PageTwo, previewPage as PreviewPage} from '$lib/components'

    
    let initPageNum: number | null = 1
    

    let pageNum = $state(initPageNum)
    let totalForm: PostForm = $state({role: 'Canvas'})

    function handleNext(){
        pageNum += 1
    }

    function handleExit(){
        history.back()
    }
    function handlePrevious(){
        pageNum -= 1
    }
    function handleFormChange(input: 'title' | 'image' | 'desc' | 'role', value: string){
        totalForm[input] = value;
    }
</script>

<div class="postCreationContainer">
    <div class="creationHeading">
        <h3>New Post</h3>
        <button class="exit" onclick={handleExit}>X</button>
    </div>
    <div class="form_area">
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <form method="POST" use:enhance action="?/upload">
            <div class:pageOne={pageNum === 1} class:pageOneHide={pageNum !== 1}>
                <PageOne formChange={handleFormChange}/>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="nextContainer" id="pageOneNext" onclick={handleNext}>
                    Next <img src={nextIcon} alt="second next" class="nextIcon"  />
                </div>
            </div>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div class:pageTwo={pageNum === 2} class:pageTwoHide={pageNum !== 2}>
                <PageTwo formChange={handleFormChange}/>
                <div class="arrowContainer">
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class="prevContainer" onclick={handlePrevious}>
                        <img src={nextIcon} alt="previous" class="previousIcon"  /> Prev
                    </div>
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class="nextContainer" onclick={handleNext}>
                        Next <img src={nextIcon} alt="second next" class="nextIcon"  />
                    </div>
                </div>
            </div>
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class:pageThree={pageNum === 3} class:pageThreeHide={pageNum !== 3}>
                {#if totalForm.image && totalForm.title}
                    <PreviewPage formData={totalForm}/>
                {:else}
                    <div>Finish required fields</div>
                {/if}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <div class="prevContainer" onclick={handlePrevious}>
                    <img src={nextIcon} alt="previous" class="previousIcon"  /> Prev
                </div>
            </div>
        </form>
    </div>
</div>

<style>
    .pageThreeHide {
        display: none;
    }
    .pageThree {
        width: 100%;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px solid #000;
    }
    #pageOneNext {
        width: 100%;
        display: flex;
        justify-content: end;
    }
    .prevContainer {
        width: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .nextContainer {
        width: 35%;
        align-items: center;
        justify-content: center;
        display: flex;
    }
    .arrowContainer {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .previousIcon {
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        display: flex;
        align-items: center;
        justify-content: end;
        padding-right: 10px;
        height: 25px;
        border: none;
        margin-right: 10px;
    }

    .exit {
        width: 25px;
        height: 2em;
        margin: 5px;
        background-color:#7FBC8C;
        border: none;
        font-weight: bolder;
        font-size: 1.25em;
        position: absolute;
        right: 0;
        padding: 10px;
        text-decoration: none;
        color: black;
    }

    
    .form_area {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #eddcd9;
		width: 90%;
		border: 2px solid #264143;
		border-radius: 20px;
		box-shadow: 3px 4px 0px 1px #e99f4c;
	}
    .nextIcon {
        height: 25px;
        border: none;
        margin-left: 10px;
    }
    .creationHeading {
        width: 100%;
        display: flex;
    }
    .creationHeading h3 {
        text-align: center;
        width: 100%;
        height: 3em;
        padding-top: 10px;
        text-decoration: underline;
    }
    .postCreationContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }
    .pageOne {
        width: 100%;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .pageOneHide {
        display: none;
    }
    .pageTwo {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    .pageTwoHide {
        display: none;
    }
</style>