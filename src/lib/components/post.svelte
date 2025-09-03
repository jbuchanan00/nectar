<script lang="ts">
    let aspectRatio = $state(0)
    const {formData} = $props()
    const {totalForm} = formData
    
    import { base } from "$app/paths";
	import { onMount } from "svelte";
	import Tag from "./tag.svelte";
    
    onMount(() => {
        let img = new Image();
        img.src = totalForm.image;
        aspectRatio = img.naturalWidth / img.naturalHeight;
        aspectRatio = aspectRatio < .9 ? .8 : aspectRatio < 1.5 ? 1 : 1.91
        console.log(aspectRatio)
    })
</script>

<div class="full">
    <div class="heading">
        <div class="profileInfo">
            <div class="profilePicture standardCont">
                <img src={`${base}/placeholder/profile-temp.png`} alt="profile" />
            </div>
            <div class="profileMeta">
                <h4 class="profileName">Name</h4>
                <h6 class="profileLocation">Location, Loc</h6>
            </div>
        </div>
        <div class="more">
            <button type="button" class="moreButton standardCont"><img src={`${base}/icons/menu-dots.png`} alt="more" /></button>
        </div>
    </div>
    <div class="body">
        <img src={totalForm.image ?? `${base}/test/test-post-picture.jpg`} alt="post" />
    </div>
    <div class="actions">
        <div class="leftButtons">
            <button type="button" class="actionButton standardCont"><img src={`${base}/icons/heart.svg`} alt="heart" /></button>
            <button type="button" class="actionButton standardCont"><img src={`${base}/icons/comment.svg`} alt="comment" /></button>
            <button type="button" class="actionButton standardCont"><img src={`${base}/icons/upload.svg`} alt="share" /></button>
        </div>
        <div class="rightButton">
            <button type="button" class="actionButton standardCont"><img src={`${base}/icons/bookmark.svg`} alt="bookmark" /></button>
        </div>
    </div>
    <div class="metadata">
        <div class="likeHeading">
            <h4>0 LIKES</h4>
        </div>
        <div class="description">
            <div class="descriptionName">
                Name
            </div>
            <div class="descriptionBody">
                {totalForm.description ?? ' '}
            </div>
        </div>
        <div class="tags">
            {#each totalForm.tag as tag}
            <div class="tag">
                <Tag tagText={tag} />
            </div>
            {/each}
        </div>
        <div class="commentViewing">
            <a href="/addpost">View all {0} comments</a>
        </div>
        <div class="timeStamp">
            JUST NOW
        </div>
    </div>
</div>

<style>
    .timeStamp {
        font-size: .6em;
        color: #4f6068;
        font-weight: 900;
    }
    .commentViewing a:visited {
        color: #2867e8;
    }
    .commentViewing a{
        color: #2867e8;
        font-size: .7em;
        text-decoration: none;
        font-weight: 900;
    }
    .tag{
        margin: 5px;
    }
    .tags {
        clear: left;
        display: flex;
        flex-wrap: wrap;
    }
    .description {
        margin: 0px 0px 10px 0px;
    }
    .descriptionBody {
        font-size: .75em;
    }
    .descriptionName {
        float: left;
        padding-right: 10px;
        font-weight: 700;
        font-size: .75em;
    }
    .likeHeading {
        padding-bottom: 7px;
        font-size: .8em;
    }
    .metadata {
        background-color: #86efac;
        padding: 10px;
    }
    .leftButtons {
        display: flex;
        width: 50%;
        justify-content: space-around;
    }
    .rightButton {
        padding-right: 10px;
    }
    .actions button {
        background-color: white;
    }
    .actions {
        display: flex;
        justify-content: space-between;
        background-color: #a5f3fc;
        height: 60px;
        margin-top: -5px;
        border-bottom: 3px solid black;
        align-items: center;
    }
    .profileName {
        font-size: .9em;
    }
    .profileLocation {
        font-size: .6em;
        font-weight: 600;
    }
    .profileMeta {
        margin-left: 3px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .more {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .moreButton img {
        width: 50%;
    }
    .moreButton {
        background-color: #fde047;
    }
    .body img {
        width: 100%;
        aspect-ratio: --var(aspect-ratio);
        object-fit: cover;
        border-bottom: 3px solid black;
    }
    
    .standardCont {
        height: 40px;
        width: 40px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 3px solid #000;
        box-shadow: 3px 3px black;
    }
    .standardCont:active {
        box-shadow: none;
        transform: translateX(3px) translateY(3px);
    }
    .profilePicture img {
        max-width: 100%;
        max-height: 100%;
        aspect-ratio: 1/1;
    }
    .profilePicture {
        background-color: white;
        margin: 5px;
        height: 40px;
        width: 40px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 3px solid #000;
        box-shadow: 3px 3px black;
    }
    .heading {
        display: flex;
        background-color: #f472b6;
        justify-content: space-between;
        padding: 5px;
        border-bottom: 3px solid black;
    }
    .profileInfo {
        display: flex;
    }
    .full {
        width: 95%;
        border: 5px solid black;
        box-shadow: 5px 5px black;
    }
</style>