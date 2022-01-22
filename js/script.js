// SPISOK
$('.filter-equipment > p').click(function () {
    $('.filter-equipment > li').slideToggle();
});
$('.filter-brand > p').click(function () {
    $('.filter-brand > li').slideToggle();
});
$('.filter-count > p').click(function () {
    $('.filter-count > li').slideToggle();
});
$('.filter-distance > p').click(function () {
    $('.filter-distance > li').slideToggle();
});
$('.filter-square > p').click(function () {
    $('.filter-square > li').slideToggle();
});
$('.filter-color > p').click(function () {
    $('.filter-color > li').slideToggle();
});
$('.category-mobile__title').click(function () {
    $('.category-mobile__ul').slideToggle();
});

const filterLi = document.querySelectorAll('.filter-color li');
const filterImg = document.querySelectorAll('.filter-color img');
for (let i = 0; i < filterImg.length; i++) {
    filterImg[i].addEventListener('click', noCheked);
}
for (let i = 0; i < filterLi.length; i++) {
    if (!filterLi[i].firstElementChild.checked) {
        filterLi[i].addEventListener('click', activeEl);
    }
    else {
        filterLi[i].addEventListener('click', addChecked);
    }
}

function noCheked(e) {
    e.target.closest('li').firstElementChild.checked = false;
    e.target.closest('li').classList.remove('labelActive');
    e.target.closest('li').addEventListener('click', activeEl);
    e.target.closest('li').classList.toggle('__active');
}

function activeEl(e) {
    const target = e.target.closest('input');
    if (target) {
        target.parentElement.classList.toggle('__active');
        target.parentElement.removeEventListener('click', activeEl);
        target.addEventListener('click', addChecked);
    }
}
function addChecked(e) {
    e.target.classList.add('labelActive');
    e.target.checked = true;
}


// POLZUNOK

const rangeSlider = document.querySelector('#range-slider');

if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
        start: [3000, 23000],
        connect: true,
        step: 1,
        tooltips: [true, true],
        format: wNumb({
            decimals: 0,
        }),
        range: {
            'min': 3000,
            'max': 35000
        }
    });
}

const noUiTooltip = document.querySelectorAll('.noUi-tooltip');
noUiTooltip[0].style.paddingLeft = '30px';
noUiTooltip[1].style.paddingRight = '15px';

mergeTooltips(rangeSlider, 22, ' - ');

function mergeTooltips(slider, threshold, separator) {

    var textIsRtl = getComputedStyle(slider).direction === 'rtl';
    var isRtl = slider.noUiSlider.options.direction === 'rtl';
    var isVertical = slider.noUiSlider.options.orientation === 'vertical';
    var tooltips = slider.noUiSlider.getTooltips();
    var origins = slider.noUiSlider.getOrigins();

    // Move tooltips into the origin element. The default stylesheet handles this.
    tooltips.forEach(function (tooltip, index) {
        if (tooltip) {
            origins[index].appendChild(tooltip);
        }
    });

    slider.noUiSlider.on('update', function (values, handle, unencoded, tap, positions) {

        var pools = [[]];
        var poolPositions = [[]];
        var poolValues = [[]];
        var atPool = 0;

        // Assign the first tooltip to the first pool, if the tooltip is configured
        if (tooltips[0]) {
            pools[0][0] = 0;
            poolPositions[0][0] = positions[0];
            poolValues[0][0] = values[0];
        }

        for (var i = 1; i < positions.length; i++) {
            if (!tooltips[i] || (positions[i] - positions[i - 1]) > threshold) {
                atPool++;
                pools[atPool] = [];
                poolValues[atPool] = [];
                poolPositions[atPool] = [];
            }

            if (tooltips[i]) {
                pools[atPool].push(i);
                poolValues[atPool].push(values[i]);
                poolPositions[atPool].push(positions[i]);
            }
        }

        pools.forEach(function (pool, poolIndex) {
            var handlesInPool = pool.length;

            for (var j = 0; j < handlesInPool; j++) {
                var handleNumber = pool[j];

                if (j === handlesInPool - 1) {
                    var offset = 0;

                    poolPositions[poolIndex].forEach(function (value) {
                        offset += 1000 - value;
                    });

                    var direction = isVertical ? 'bottom' : 'right';
                    var last = isRtl ? 0 : handlesInPool - 1;
                    var lastOffset = 1000 - poolPositions[poolIndex][last];
                    offset = (textIsRtl && !isVertical ? 100 : 0) + (offset / handlesInPool) - lastOffset;

                    // Center this tooltip over the affected handles
                    tooltips[handleNumber].innerHTML = poolValues[poolIndex].join(separator);
                    tooltips[handleNumber].style.display = 'block';
                    tooltips[handleNumber].style[direction] = offset + '%';

                } else {
                    // Hide this tooltip
                    tooltips[handleNumber].style.display = 'none';
                }
            }
        });
    });
}


const filterMob = document.querySelector('.search-block-mob__filters');
const acceptBtn = document.querySelector('#accept');
const mobileMenuBtn = document.querySelector('.header__menu > a');
const closeMenuMobile = document.querySelector('.logo-close__close-block > img');

filterMob.addEventListener('click', toggleFilterMenu);
acceptBtn.addEventListener('click', toggleFilterMenu);
mobileMenuBtn.addEventListener('click', toggleMenu);
closeMenuMobile.addEventListener('click', closeMobile);

function toggleFilterMenu() {
    const filters = document.querySelector('.main-content__filters').classList.toggle('__active-mobile');
    const main = document.querySelector('.main-content__products').classList.toggle('hiden');
    const footer = document.querySelector('.footer').classList.toggle('hiden');
    const header = document.querySelector('.header').classList.toggle('hiden');
    const searchBlock = document.querySelector('.header__search-block-mob').classList.toggle('hiden');
    const baner = document.querySelector('.banner-block').classList.toggle('hiden');
    const title = document.querySelector('.main-content__title').classList.toggle('hiden');
    const searchResult = document.querySelector('.search-block__result-mob').classList.toggle('hiden');
}

function toggleMenu() {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.add('__active');
    toggleFilterMenu();
    const filters = document.querySelector('.main-content__filters').classList.remove('__active-mobile');
}

function closeMobile() {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.remove('__active');
    toggleFilterMenu();
    const filters = document.querySelector('.main-content__filters').classList.remove('__active-mobile');
}