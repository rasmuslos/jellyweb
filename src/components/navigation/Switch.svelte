<style>
    label {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }
    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    span {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--background-secondary);
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 34px;
    }
    span:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: var(--background-light);
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }

    input:checked + span {
        background-color:  var(--highlight);
    }
    input:checked + span:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    input:focus + span {
        box-shadow: 0 0 1px var(--highlight);
    }
</style>

<label>
    <input on:change type="checkbox">
    <span></span>
</label>