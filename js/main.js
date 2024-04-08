$(function(){

	$('select').styler({
        selectSearch: false,
    });

    $('.dropdown_select .dropdown_select_name').on('click', function(){
        $('.dropdown_select').removeClass('opened');
        $(this).parent().toggleClass('opened');
    });

    $('.login_arrow').on('click', function(){
        $('.card_list_drop').toggleClass('active');
    });

    $('.dropdown_select .item').on('click', function(){
        const parent = $(this).parents('.dropdown_select');
        const name = $(this).text();

        $(this).addClass('active');
        parent.find('.dropdown_select_name').text(name);
        parent.removeClass('opened');
    });

    $(document).on('click touchstart', function(e){
        if( $(e.target).closest('.dropdown_select').length) 
          return;
        if ($('.dropdown_select').hasClass('opened')){
            $('.dropdown_select').removeClass('opened');
        }
    });
	
	var $body = $(document.body),
      	$html = $(document.documentElement);

    function formPopup($btn,$wrap, clear){

        var closeForm = $('.formExtraWrapper .close-form'),
            cancel = $('.formExtraWrapper .cancel'),
            formWrap = $($wrap),
            formBtn = $($btn),
            formOpened = 'opened',
            overflowHidden = 'oveflowHidden';

        closeForm.on('click', function() {
            formWrap.removeClass(formOpened);
            $html.removeClass(overflowHidden);
        });
        cancel.on('click', function(event) {
            event.preventDefault();
            formWrap.removeClass(formOpened);
            $html.removeClass(overflowHidden);
        });

        formBtn.on('click', function(event) {
            if(clear) {
                formWrap.find('form')[0].reset();
                const $selectElement = $($wrap + ' .field select');
                const $optionToSelect = $selectElement.find('option[value=""]');
                console.log($selectElement)
                if ($optionToSelect.length > 0) {
                    $selectElement.val(null);
                    $optionToSelect.prop('selected', true);
                    $selectElement.trigger('refresh');
                }
            }
            formWrap.addClass(formOpened);
            $html.toggleClass(overflowHidden);
            event.preventDefault();
        });

        $html.on('keyup', function(event) {
            if (formWrap.hasClass(formOpened) && event.keyCode == 27) {
                formWrap.removeClass(formOpened);
                $html.removeClass(overflowHidden);
            }
        });
        $body.on('click touchstart', function(a) {
            if ($(a.target).closest('.formExtraWrapper').length || $(a.target).closest(formBtn).length) return;
            if (formWrap.hasClass(formOpened)) {
                formWrap.removeClass(formOpened);
                $html.removeClass(overflowHidden);
            }
        });
    }
    
    formPopup('.create_membership,.edit_btn_membership','.membership_popup', true);
    formPopup('.create_coupon,.edit_btn_coupon','.coupon_popup', true);
    formPopup('.create_employee,.edit_btn_employee','.employee_popup', true);
    formPopup('.set_cashbacks','.set_cashbacks_popup');
    formPopup('.set_discounts','.set_discounts_popup');
    formPopup('.set_withdraws','.set_withdraws_popup');
    formPopup('.set_membership','.set_membership_popup');

    $('.edit_btn_membership').on('click', function(){
        const parent = $(this).closest('tr');
        const userID = parent.find('.user-id').text();
        const expirePeriod = parent.find('.expire-period').text();
        const cartType = parent.find('.cart-type').text();

        $('.membership_popup .field input[name="user-id"]').val(userID);
        $('.membership_popup .field input[name="expire-period"]').val(expirePeriod);

        const $selectElement = $('.membership_popup .field select[name="cart-type"]');
        const $optionToSelect = $selectElement.find('option[value="' + cartType + '"]');
        
        if ($optionToSelect.length > 0) {
            $selectElement.val(null);
            $optionToSelect.prop('selected', true);
            $selectElement.trigger('refresh');
        }
    });

    $('.edit_btn_employee').on('click', function(){
        const parent = $(this).closest('tr');
        const firstName = parent.find('.first-name').text();
        const lastName = parent.find('.last-name').text();
        const phoneNumber = parent.find('.phone-number').text();
        const accountType = parent.find('.account-type').text();
        const dateBirth = parent.find('.date-birth').text();

        $('.employee_popup .field input[name="first-name"]').val(firstName);
        $('.employee_popup .field input[name="last-name"]').val(lastName);
        $('.employee_popup .field input[name="phone-number"]').val(phoneNumber);
        $('.employee_popup .field input[name="date-birth"]').val(dateBirth);

        const $selectElement = $('.employee_popup .field select[name="account-type"]');
        const $optionToSelect = $selectElement.find('option[value="' + accountType + '"]');
        
        if ($optionToSelect.length > 0) {
            $selectElement.val(null);
            $optionToSelect.prop('selected', true);
            $selectElement.trigger('refresh');
        }
    });

    $('.edit_btn_coupon').on('click', function(){
        const parent = $(this).closest('tr');
        const percentage = parent.find('.percentage').text();
        const discountAmount = parent.find('.discount-amount').text();

        $('.coupon_popup .field input[name="percentage"]').val(percentage);
        $('.coupon_popup .field input[name="discount-amount"]').val(discountAmount);
    });

    function alertPopup($btn,$wrap){

        var closeForm = $('.alertExtraWrapper .cancel'),
            formWrap = $($wrap),
            formBtn = $($btn),
            formOpened = 'opened',
            overflowHidden = 'oveflowHidden';

        closeForm.on('click', function() {
            formWrap.removeClass(formOpened);
            $html.removeClass(overflowHidden);
        });
        formBtn.on('click', function(event) {
            formWrap.addClass(formOpened);
            $html.toggleClass(overflowHidden);
            event.preventDefault();
            $(this).closest('.dropdown_select').removeClass('opened');
        });

        $html.on('keyup', function(event) {
            if (formWrap.hasClass(formOpened) && event.keyCode == 27) {
                formWrap.removeClass(formOpened);
                $html.removeClass(overflowHidden);
            }
        });
        $body.on('click touchstart', function(a) {
            if ($(a.target).closest('.alertExtraWrapper').length || $(a.target).closest(formBtn).length) return;
            if (formWrap.hasClass(formOpened)) {
                formWrap.removeClass(formOpened);
                $html.removeClass(overflowHidden);
            }
        });
    }

    alertPopup('.deactivate_btn','.deactivate_popup');
    alertPopup('.delete_btn','.delete_popup');
    alertPopup('.log_out_btn','.log_out_popup');

    $('.notifications_alert .close').on('click', function(){
        $(this).closest('.notifications_alert').removeClass('opened');
    });

    var menuBtn = $('.burger'),
        menuWrapper = $('.dashboard_menu'),
        menuClose = $('.menuClose'),        
        openedMenu = 'opened',
        overflowHidden = 'oveflowHidden';

    menuBtn.on("click", function(event) {
        menuWrapper.toggleClass(openedMenu);
        menuBtn.toggleClass(openedMenu);
    });
    menuClose.on("click", function(event) {
        menuWrapper.removeClass(openedMenu);
        menuBtn.removeClass(openedMenu);
    });

    $(document).on('click touchstart', function(e){
        if( $(e.target).closest(menuBtn).length || $(e.target).closest(menuWrapper).length) 
          return;
        if (menuBtn.hasClass(openedMenu)){
            menuWrapper.removeClass(openedMenu);
            menuBtn.removeClass(openedMenu);
            $html.removeClass(overflowHidden);
        }
    });

    


    // colors 

    let bgColor = $('.card_color .color.active').css('backgroundColor');
    let textColor = $('.text_color .color.active').css('backgroundColor');

    if(!bgColor) {
        bgColor = $('#bg-picker').val();
    }

    if(!textColor) {
        textColor = $('#color-picker').val();
    }
    

    $('.card_design .card_item').css({'color': textColor, 'backgroundColor': bgColor});

    $('.colors_list .color').on('click', function(){
        $(this).siblings('.color').removeClass('active');
        $(this).addClass('active');

        if($(this).parents('.card_color').length) {
            const bg = $(this).css('backgroundColor');

            $('.card_design .card_item').css('backgroundColor', bg);
        } else {
            const color = $(this).css('backgroundColor');

            $('.card_design .card_item').css('color', color);
        }
    });

    $(document).on('click', '.color_picker', function(){
        const parent = $(this).parents('.card_color');
        console.of(132)
        parent.find('.color').removeClass('active');

        $(this).parents('.color_picker').addClass('active');
    });

    $('#color-picker').spectrum({
        type: "color",
        change: function(color) {
            const colorText = color.toHexString()
            $('.text_color .color.active').removeClass('active');
            $('.text_color .color_picker').addClass('active');
            $('.card_design .card_item').css('color', colorText);
        }
    });

    $('#bg-picker').spectrum({
        type: "color",
        change: function(color) {
            const colorBg = color.toHexString()
            $('.card_color .color.active').removeClass('active');
            $('.card_color .color_picker').addClass('active');
            $('.card_design .card_item').css('backgroundColor', colorBg);
        }
    });

    // colors 


    // add field form 
    let coundFiled = 0;
    $(document).on('click', '.add_status_btn', function(){
        coundFiled++;
        const fields = `<div class="field_row column-6">
                        <div class="field">
                            <div class="field_name">Status title</div>
                            <input type="text" name="status[new_${coundFiled}]">
                        </div>
                        <div class="field">
                            <div class="field_name">Number of visits</div>
                            <input type="text" name="number_visits[${coundFiled}]">
                        </div>
                        <div class="field">
                            <div class="field_name">Sum</div>
                            <input type="text" name="Sum[${coundFiled}]">
                        </div>
                        <div class="field">
                            <div class="field_name">Period in days</div>
                            <input type="text" name="period_days[${coundFiled}]">
                        </div>
                        <div class="field">
                            <div class="field_name">Cashback %</div>
                            <input type="text" name="Cashback[${coundFiled}]">
                        </div>
                        <div class="delete_field"></div>
                    </div>`;

        $('.set_cashbacks_popup .field_row_main').append(fields);
    });

    $(document).on('click', '.add_status_btn', function(){
        coundFiled++;
        const fields = `<div class="field_row column-5">
                        <div class="field">
                            <div class="field_name">Status title</div>
                            <input type="text" name="status[new_${coundFiled}]">
                        </div>
                        <div class="field">
                            <div class="field_name">Number of visits</div>
                            <input type="text" name="number_visits[${coundFiled}]">
                        </div>
                        <div class="field">
                            <div class="field_name">Sum</div>
                            <input type="text" name="Sum[${coundFiled}]">
                        </div>
                        <div class="field">
                            <div class="field_name">Cashback %</div>
                            <input type="text" name="Cashback[${coundFiled}]">
                        </div>
                        <div class="delete_field"></div>
                    </div>`;

        $('.set_discounts_popup .field_row_main').append(fields);
    });

    $(document).on('click', '.delete_field', function(){
        $(this).parents('.field_row').remove();
    });

    function radioField($radioButton) {
        const value = $radioButton.val();

        if (value === '0') {
            $('.parsent_fields').addClass('disabled');
            $('.number_fields').removeClass('disabled');
        } else {
            $('.parsent_fields').removeClass('disabled');
            $('.number_fields').addClass('disabled');
        }
    }

    $('.fields_radio input[name="withdraw"]').on('click', function(){
        const value = $(this).val();

        if (value === '0') {
            $('.parsent_fields').addClass('disabled');
            $('.number_fields').removeClass('disabled');
        } else {
            $('.parsent_fields').removeClass('disabled');
            $('.number_fields').addClass('disabled');
        }
    })
});

const dateSelector = document.getElementById('custom_date');

if(dateSelector){
    const picker = new Lightpick({
        field: dateSelector,
        singleDate: false,
        onSelect: function(start, end){
            let str = '';
            str += start ? start.format('Do MMMM YYYY') + ' to ' : '';
            str += end ? end.format('Do MMMM YYYY') : '...';
        }
    });
}

