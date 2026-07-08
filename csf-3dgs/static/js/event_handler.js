
document.addEventListener('DOMContentLoaded', function() {
    const levelVisualizationSlider = document.querySelector('.level-visualization');
    
    if (levelVisualizationSlider) {
        new Dics({
            container: levelVisualizationSlider,
            hideTexts: false,
            textPosition: "bottom"
        });
    }

    const independentSliders = document.querySelectorAll('.independent-slider');

    independentSliders.forEach(function(slid) {
    new Dics({
      container: slid,
      hideTexts: false,
      textPosition: "bottom",
    });
  });
});

function objectSceneEvent(idx) {
    let dics = document.querySelector('.level-visualization');
    let sections = dics.getElementsByClassName('b-dics__section');
    let imagesLength = 3;
    for (let i = 0; i < imagesLength; i++) {
        let image = sections[i].getElementsByClassName('b-dics__image-container')[0].getElementsByClassName('b-dics__image')[0];
        switch (idx) {
            case 0:
                image.src = './static/images/gaussian_hierarchy/train_00000';
                break;
            case 1:
                image.src = './static/images/gaussian_hierarchy/truck_00008';
                break;
            case 2:
                image.src = './static/images/gaussian_hierarchy/kitchen_00003';
                break;
            case 3:
                image.src = './static/images/gaussian_hierarchy/bicycle_00000';
                break;
            case 4:
                image.src = './static/images/gaussian_hierarchy/stump_00007';
                break;
            case 5:
                image.src = './static/images/gaussian_hierarchy/9df8_00010';
                break;    
        }
        switch (i) {
            case 0:
                image.src = image.src + '_lv0.webp';
                break;
            case 1:
                image.src = image.src + '_lv1.webp';
                break;
            case 2:
                image.src = image.src + '_lv2.webp';
                break;
        }
    }

    let scene_list = document.getElementById("object-scale-recon").children;
    for (let i = 0; i < scene_list.length; i++) {
        if (idx == i) {
            scene_list[i].children[0].className = "nav-link active";
        } else {
            scene_list[i].children[0].className = "nav-link";
        }
    }
}
