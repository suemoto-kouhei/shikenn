$(function(){
    const page_type = $('.contents').attr('id');
    const question = questions;
    const list1 = $('#question1');
    const list2 = $('#question2');
    const list3 = $('#question3');
    const list4 = $('#question4');
    const list5 = $('#question5');
    const list6 = $('#question6');

    const qid = Number(getParam('id'));
    const random = Math.floor(Math.random() * questions.length);
    const info = questions[qid - 1];
    const prev = $('#prev');
    const next = $('#next');
    const check = $('#check');
    let check_flg = false;

    $('#anser').on('click',function(){
        $('#question-answer').show();
    });

//index.htmlに問題を出力
    if(page_type == 'page-index'){
        question.forEach((question) =>{
            const result = question['id'];
            const is_check = (checks.indexOf(question['id']) !== -1) ? 'is-check':'';
            const a = `<a href="detail.html?id=${question['id']}" class="link ${is_check}">問題${question['id']}</a>`
            if(result <= 10){
                list1.append(a);
            }else if( result <= 20){
                list2.append(a);
            }else if(result <= 35){
                list3.append(a);
            }else if(result <= 60){
                list4.append(a);
            }else if(result <= 72){
                list5.append(a);
            }else{
                list6.append(a);
            }
        })
    }
    if(page_type == 'page-random'){
        $('#anser-open').on('click',function(){
            localStorage.removeItem('question_answer');
            $('#anser-open a').attr('href',`random10.html?id=${random + 1}`);
        });
        $('#anser-open2').on('click', function(){
            $('#anser-open2 a').attr('href',`randomall.html?id=${random + 1}`);
        });
        $('#anser-open3').on('click',function(){
            localStorage.removeItem('score-total');
        });
    }

    if(page_type == 'page-random10'){
        if( question_answers.length < 10){
            next.attr('href',`random10.html?id=${random + 1}`);
            prev.attr('href',`random10.html?id=${qid + 1}`);
            $('#next').on('click',function(){
                question_answers.push(qid);
                localStorage.setItem('question_answer',question_answers);
            })
        }else{
            if( confirm(`お疲れ様でした。`)){
                localStorage.removeItem('question_answer');
                location.href = 'random.html';
            }
        };

        if( info === undefined){
            location.href = 'index.html';
        };
        if( qid <= 1){
            prev.hide();
        };
        if( checks.indexOf(qid) !== -1){
            check.attr('class','is-check');
            check_flg = true;
        };

        $('#question-title').append(info['title'])
        $('#question-text').append(info['text'])
        $('#question-answer').append(info['answer'])
        $('#check').on('click',function(){
            if(check_flg){//trueの時
                checks.splice(checks.indexOf(qid),1);
                $('#check').removeClass('is-check');
            }else{
                checks.push(qid);
                $('#check').addClass('is-check');
            }
            console.log(checks);
            check_flg = !check_flg;
            localStorage.setItem('check',checks)
        })
    }

    if( page_type == 'page-randomall'){
        next.attr('href',`randomall.html?id=${random + 1}`);
        prev.attr('href',`randomall.html?id=${random - 1}`);

        if( qid <= 1){
            prev.hide();
        };
        if( checks.indexOf(qid) !== -1){
            check.attr('class','is-check');
            check_flg = true;
        }

        $('#question-title').append(info['title'])
        $('#question-text').append(info['text'])
        $('#question-answer').append(info['answer'])
        $('#check').on('click',function(){
            if(check_flg){//trueの時
                checks.splice(checks.indexOf(qid),1);
                $('#check').removeClass('is-check');
            }else{
                checks.push(qid);
                $('#check').addClass('is-check');
            }
            console.log(checks);
            check_flg = !check_flg;
            localStorage.setItem('check',checks)
        })
    }
    //採点モード
    if( page_type == 'page-score'){
        if( qid <= 1){
            prev.hide();
        };
        if( qid >= questions.length){
            next.hide();
        };
        if( checks.indexOf(qid) !== -1){
            check.attr('class','is-check');
            check_flg = true;
        }
        $('#question-title').append(info['title'])
        $('#question-text').append(info['text'])
        $('#question-answer').append(info['answer'])
        $('#check').on('click',function(){
            if(check_flg){//trueの時
                checks.splice(checks.indexOf(qid),1);
                $('#check').removeClass('is-check');
            }else{
                checks.push(qid);
                $('#check').addClass('is-check');
            }
            check_flg = !check_flg;
            localStorage.setItem('check',checks)
        });

        $('#anser').on('click',function(){
            const check_box = $('.checks');
            arr1 = [];
            for(let i = 0;i < check_box.length;i++){
                if(check_box[i].checked){
                    arr1.push(check_box[i].value);
                }
            }
            console.log(arr1);
            localStorage.setItem('score-total',total);
            if( arr1 == questions[qid - 1].answer){
                alert('正解です。');
                total.push(0);
                localStorage.setItem('score-total',total);
                location.href = `score.html?id=${qid + 1}`
            }else{
                localStorage.setItem('score-total', total);
                alert('間違いです。')
                location.href = `score.html?id=${qid + 1}`
            }
            if( qid == question.length ){
                alert(`お疲れ様でした。点数は${total.length}/${questions.length}点でした。`)
                location.href = 'index.html';
            }
        });
        console.log(questions.length);
        console.log(questions[qid - 1].answer);
    }

    if(page_type == 'page-detail'){
        prev.attr('href',`detail.html?id=${qid - 1}`);
        next.attr('href',`detail.html?id=${qid + 1}`);
        if( info === undefined){
            location.href = 'index.html';
        };
        if( qid <= 1){
            prev.hide();
        };
        if( qid >= questions.length){
            next.hide();
        };
        if( checks.indexOf(qid) !== -1){
            check.attr('class','is-check');
            check_flg = true;
        }

        $('#question-title').append(info['title'])
        $('#question-text').append(info['text'])
        $('#question-answer').append(info['answer'])
        $('#check').on('click',function(){
            if(check_flg){//trueの時
                checks.splice(checks.indexOf(qid),1);
                $('#check').removeClass('is-check');
            }else{
                checks.push(qid);
                $('#check').addClass('is-check');
            }
            console.log(checks);
            check_flg = !check_flg;
            localStorage.setItem('check',checks)
        })
    }
    if(page_type == 'page-list'){
        question.forEach((question) =>{
            if(checks.indexOf(question['id']) !== -1){
                const result = question['id'];
                const a = `<a href="detail.html?id=${question['id']}" class="link is-check">問題${question['id']}</a>`
                if(result <= 10){
                    list1.append(a);
                }else if( result <= 20){
                    list2.append(a);
                }else if(result <= 35){
                    list3.append(a);
                }else if(result <= 60){
                    list4.append(a);
                }else if(result <= 72){
                    list5.append(a);
                }else{
                    list6.append(a);
                }
            }
        })
        if( checks.length ){
            $('#check-delete').show();
        }else{
            $('#check-delete').hide();
        }

        $('#check-delete').on('click',function(){
            if( confirm('本当に消して良いですか？')){
                localStorage.removeItem('check');
                location.href = 'list.html';
            }
        })
    }

})










