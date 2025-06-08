<script>
    let {formData} = $props()

</script>

<div class="modalContainer">
    <div class="modal">
        <div class="postContainer">
            <div class="imageContainer">
                <img src={formData.image} alt="post" />
            </div>
            <div class="infoContainer">
                <h3>{formData.title}</h3>
                <p>{formData.desc}</p>
            </div>
        </div>
    </div>
</div>

<style>
    p {
        font-size: .75em;
    }
    h3 {
        font-weight: bolder;
    }
    .infoContainer {
        margin-top: 10px;
        width: 85%;
    }
    .postContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 25px;
    }
    .imageContainer {
        width: 85%;
        padding-bottom: 20px;
        border-bottom: 5px solid black;
    }
    .postContainer img {
        width: 100%;
        border-radius: 5px;
        border: 2px solid #000;
        transform: rotate(-2deg);
        box-shadow: 5px 5px;
    }
    .modal {
        background-color: #ff6b6b;
        width: 100%;
        height: 90%;
        border-radius: 10px;
        border: 2px solid black;
        overflow-y: auto;
    }
    .modalContainer {
        width: 100%;
    }
</style>