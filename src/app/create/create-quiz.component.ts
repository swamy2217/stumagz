import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    ViewChild,
    Input,
} from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormArray,
    FormControl,
    ValidatorFn,
    ValidationErrors,
} from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { HttpService } from '@app/services/http.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create',
    templateUrl: './create-quiz.component.html',
    styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {
    /*date time config fields */
    @ViewChild('picker') picker: any;
    @ViewChild('picker1') picker1: any;
    showSeconds = false;
    minDate = new Date();
    minEndDate = new Date();
    errorMessage: string = '';
    successMessage: string = '';

    imgsrc: any;
    selectedCategory: string;
    addQuizForm: FormGroup;
    anArray: FormArray;
    optionArray: FormArray;
    features = ['SKILL', 'MAGAZINE', 'BRAND', 'DAILY'];
    showInput = null;
    isPublishButtonClicked: boolean;
    isLoading: boolean;
    isQuestionsLoading: boolean;


    file = [];
    QuestionsFileName = 'Choose file';
    fileError: string;

    constructor(
        private sanitize: DomSanitizer,
        // private toastrService: ToastrService,
        private formBuilder: FormBuilder,
        private router: Router,
        private httpService: HttpService
    ) { }

    ngOnInit(): void {
        this.isLoading = false;
        this.minDate.setSeconds(0);
        this.minDate.setMinutes(this.minDate.getMinutes() + 30);
        this.selectedCategory = 'MCQ';
        this.isPublishButtonClicked = false;
        this.addQuizFormGroup();
    }

    addQuizFormGroup() {
        this.minEndDate.setSeconds(0);
        this.minEndDate.setDate(this.minDate.getDate() + 1);
        const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        // '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-?=]*/?';

        this.addQuizForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            instructions: new FormControl(null, Validators.required),
            coverImageUrl: new FormControl(null),
            type: new FormControl(null, Validators.required),
            brandCode: new FormControl(null),
            skillCode: new FormControl(null),

            videoUrl: new FormControl(null, [Validators.pattern(reg)]),
            numberOfQuestions: new FormControl(
                null,
                Validators.compose([Validators.required, Validators.min(5)])
            ),
            durationInMinutes: new FormControl(
                null,
                Validators.compose([Validators.required, Validators.min(1)])
            ),
            startTime: new FormControl(this.minDate, Validators.required),
            endTime: new FormControl(this.minEndDate, Validators.required),
            questions: new FormArray([this.initQuestions()]),
        });
        this.anArray = this.addQuizForm.get('questions') as FormArray;
    }

    initQuestions() {
        return new FormGroup({
            sno: new FormControl(1),
            type: new FormControl('MCQ'),
            imageUrl: new FormControl(''),
            text: new FormControl(null),
            options: new FormArray([
                this.initOptions(1),
                this.initOptions(2),
                this.initOptions(3),
                this.initOptions(4),
            ]),
        }, atLeastOne(Validators.required, ['text', 'imageUrl']));
    }

    initOptions(index, textInput = '') {
        return new FormGroup({
            sno: new FormControl(index, Validators.required),
            text: new FormControl(textInput),
            imageUrl: new FormControl(''),
            correctOption: new FormControl(false, Validators.required),
        }, atLeastOne(Validators.required, ['text', 'imageUrl']));
        // correctOption: new FormControl('', Validators.required),
    }

    get quizFormGroup() {
        return this.addQuizForm.get('questions') as FormArray;
    }

    getOptions(form) {
        return form.controls.options.controls;
    }

    /* openDialog() {
        console.log('dialog will open');
        const dialogRef = this.dialog.open(ImportFileComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    } */

    onQuestionFileImport(event: any): void {
        this.QuestionsFileName = 'Choose file';
        const allowedFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
        const maxFileSize5MB = 5242880;
        this.file = [];
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (file.size > maxFileSize5MB) {
                this.fileError = 'File Size should be less than 5MB';
            } else if (allowedFileTypes.indexOf(file.type) === -1) {
                this.fileError = 'Upload excel/csv files only';
            } else if (file.name) {
                this.isQuestionsLoading = true;
                this.anArray.clear();
                this.file.push(file);
                this.QuestionsFileName = file.name;
                this.httpService.uploadQuestionsFile(file).subscribe(res => {
                    this.generateQuestions(res);
                },
                    (err) => {
                        console.log(err);
                    });
            }
            setTimeout(() => {
                this.fileError = '';
            }, 5000);
        }
    }

    onFileSelect(event) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            // this.addProductForm.get('add_image').setValue(file);
            const imagValue = URL.createObjectURL(file);
            this.imgsrc = this.sanitize.bypassSecurityTrustUrl(imagValue);
            this.fileUpload(file);
        }
    }

    onQuestionFileSelect(event, QuestionIndex: number, OptionIndex: number) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            // this.addProductForm.get('add_image').setValue(file);
            const imagValue = URL.createObjectURL(file);
            const imageLocalUrl = this.sanitize.bypassSecurityTrustUrl(imagValue);
            if (OptionIndex === -1) {
                this.anArray.value[QuestionIndex].imageUrl = imageLocalUrl;
                // this.addQuizForm.controls.questions[QuestionIndex].controls['imageUrl'].setValue('karanArjun');
                this.QuestionFileUpload(file, QuestionIndex, OptionIndex);
            } else {
                this.anArray.value[QuestionIndex].options[OptionIndex].imageUrl = imageLocalUrl;
                this.QuestionFileUpload(file, QuestionIndex, OptionIndex);
                this.anArray.value[QuestionIndex].text = ' ';
                // this.QuestionFileUpload(file, this.anArray.value[QuestionIndex].options[OptionIndex].imageUrl);
            }
            return false;
        }
    }

    fileUpload(imageFile) {
        this.httpService.uploadFile(imageFile).subscribe(res => {
            this.addQuizForm.patchValue({ coverImageUrl: res });
        },
            (err) => {
                if (this.checkValidUrl) {
                    this.addQuizForm.patchValue({ coverImageUrl: err });
                }
            });
    }

    QuestionFileUpload(imgFile, quizQuestion, optionIndex) {
        this.httpService.uploadFile(imgFile).subscribe(res => {
            if (optionIndex === -1) {
                this.quizFormGroup.controls[quizQuestion].patchValue({ imageUrl: res });
                this.quizFormGroup.controls[quizQuestion].patchValue({ text: '' });
                // this.anArray.value[quizQuestion].text = ' ';
            } else {
                const playersFormsArray = this.quizFormGroup.at(quizQuestion).get('options') as FormArray;
                playersFormsArray.controls[optionIndex].patchValue({ imageUrl: res });
                playersFormsArray.controls[quizQuestion].patchValue({ text: ' ' });
                // this.quizFormGroup.controls[quizQuestion].options[optionIndex].text = ' ';
            }
        },
            (err) => {
                if (this.checkValidUrl) {
                    /* quizQuestion = err; */
                    if (optionIndex === -1) {
                        this.quizFormGroup.controls[quizQuestion].patchValue({ imageUrl: err });
                        this.quizFormGroup.controls[quizQuestion].patchValue({ text: ' ' });
                        /* this.anArray.value[quizQuestion].imageUrl = err;
                        this.anArray.value[quizQuestion].text = ' '; */
                    } else {
                        const playersFormsArray = this.quizFormGroup.at(quizQuestion).get('options') as FormArray;
                        playersFormsArray.controls[optionIndex].patchValue({ imageUrl: err });
                        playersFormsArray.controls[quizQuestion].patchValue({ text: ' ' });
                        /* this.anArray.value[quizQuestion].options[optionIndex].imageUrl = err;
                        this.anArray.value[quizQuestion].options[optionIndex].text = ' '; */
                    }
                }
            });
    }

    checkValidUrl(url) {
        const pattern = /^((http|https|ftp):\/\/)/;
        if (!pattern.test(url)) {
            return true;
        }
    }

    addMCQQuestion() {
        if (this.anArray.length >= 50) {
            this.errorMessage = 'You can add max 50 only';
            setTimeout(() => {
                this.errorMessage = '';
            }, 5000);
            // this.toastrService.error('You can add max 50 only');
            return false;
        }
        this.anArray.push(this.createQTS());
    }

    addTrueFalseQuestion() {
        if (this.anArray.length >= 50) {
            // this.toastrService.error('You can add max 50 only');
            this.errorMessage = 'You can add max 50 only';
            setTimeout(() => {
                this.errorMessage = '';
            }, 5000);
            return false;
        }
        this.anArray.push(this.createTFQuestion());
    }

    // create set excel to questions 
    generateQuestions(items) {
        items.forEach((item, index) => {
            if (item.type === 'MCQ') {
                this.addMCQQuestionForm(item);
            } else if (item.type === 'TF') {
                this.addTFQuestionForm(item);
            }
        });
        this.isQuestionsLoading = false;
    }

    addMCQQuestionForm(item) {
        const { sno, text, imageUrl, options } = item;
        const QuestionForm = this.formBuilder.group({
            sno: [sno],
            type: ['MCQ'],
            imageUrl: [imageUrl],
            text: [text, Validators.required],
            options: this.formBuilder.array([
                this.setOptions(options[0], sno),
                this.setOptions(options[1], sno),
                this.setOptions(options[2], sno),
                this.setOptions(options[3], sno),
            ]),
        }, atLeastOne(Validators.required, ['text', 'imageUrl']));
        this.optionArray = QuestionForm.get('options') as FormArray;
        this.anArray.push(QuestionForm);
    }

    setCorrectOption(index, QId) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.anArray.value[QId].options.length; i++) {
            this.anArray.value[QId].options[i].correctOption = false;
        }
        this.anArray.value[QId].options[index].correctOption = true;
    }

    addTFQuestionForm(Qdata) {
        const { sno, text, imageUrl, options } = Qdata;
        const QuestionForm = this.formBuilder.group({
            sno: [sno],
            type: ['TF'],
            imageUrl: [imageUrl],
            text: [text],
            options: this.formBuilder.array([
                this.setOptions(options[0], sno),
                this.setOptions(options[1], sno)
            ]),
        }, atLeastOne(Validators.required, ['text', 'imageUrl']));
        this.optionArray = QuestionForm.get('options') as FormArray;
        this.anArray.push(QuestionForm);
    }

    setOptions(optinData, QId) {
        const { sno, text, imageUrl, correctOption } = optinData;
        /* if (correctOption) {
            this.setCorrectOption(sno, QId);
        } */
        return new FormGroup({
            sno: new FormControl(sno, Validators.required),
            text: new FormControl(text),
            imageUrl: new FormControl(imageUrl),
            correctOption: new FormControl(correctOption, Validators.required),
        }, atLeastOne(Validators.required, ['text', 'imageUrl']));
    }

    // Question formgroup
    createQTS(type = 0): FormGroup {
        const idx =
            this.anArray && this.anArray.length ? this.anArray.length + 1 : 0;
        type = type ? type : 4;
        const QuestionForm = this.formBuilder.group({
            sno: [idx],
            type: ['MCQ'],
            imageUrl: [''],
            text: [null, Validators.required],
            options: this.formBuilder.array([
                this.initOptions(1),
                this.initOptions(2),
                this.initOptions(3),
                this.initOptions(4),
            ]),
        }, atLeastOne(Validators.required, ['text', 'imageUrl']));
        this.optionArray = QuestionForm.get('options') as FormArray;
        return QuestionForm;
    }

    createTFQuestion() {
        const idx =
            this.anArray && this.anArray.length ? this.anArray.length + 1 : 0;
        const QuestionForm = this.formBuilder.group({
            sno: [idx],
            type: ['TF'],
            imageUrl: [''],
            text: [null],
            options: this.formBuilder.array([
                this.initOptions(1, 'True'),
                this.initOptions(2, 'False')
            ]),
        }, atLeastOne(Validators.required, ['text', 'imageUrl']));
        this.optionArray = QuestionForm.get('options') as FormArray;
        return QuestionForm;
    }

    addPhoto() { }

    removeQuestion(index) {
        this.anArray.removeAt(index);
    }

    onChange(newValue) {
        this.showInput = ['SKILL', 'BRAND'].includes(newValue.value)
            ? newValue.value
            : null;
    }

    radioChange(event, QId) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.anArray.value[QId].options.length; i++) {
            this.anArray.value[QId].options[i].correctOption = false;
        }
        this.anArray.value[QId].options[event.value].correctOption = true;
    }

    // submit quiz application
    pubishForm(ids) {
        /* const quizDataTemp = this.addQuizForm.value;
        console.log(quizDataTemp);
        return false; */
        if (!this.addQuizForm.valid) {
            // this.toastrService.error('Please fill all valid details');
            this.errorMessage = 'Please fill all valid details';
            setTimeout(() => {
                this.errorMessage = '';
            }, 5000);

            return false;
        }

        this.isLoading = true;
        const quizData = this.addQuizForm.value;
        quizData.startTime = new Date(quizData.startTime).toISOString();
        quizData.endTime = new Date(quizData.endTime).toISOString();
        this.isPublishButtonClicked = true;
        this.httpService
            .post('api', quizData)
            .pipe(first())
            .subscribe(
                (data) => {
                    this.isLoading = false;
                    this.isPublishButtonClicked = false;
                    if (data) {
                        this.addQuizForm.reset();
                        this.successMessage = 'Successfully added';
                        setTimeout(() => {
                            this.successMessage = '';
                            this.router.navigate(['/home']);
                        }, 3000);
                        // this.toastrService.success('Successfully added');
                    }
                },
                (err) => {
                    this.isLoading = false;
                    this.isPublishButtonClicked = false;
                    if (typeof err === 'string') {
                        this.errorMessage = err;
                        setTimeout(() => {
                            this.errorMessage = '';
                        }, 5000);
                    }
                    /* this.toastrService.error(
                        'Something went wrong, please try again later'
                    ); */
                }
            );
    }
}

/** Custom CDK stepper component */
@Component({
    selector: 'app-custom-stepper',
    templateUrl: './stepper/custom-stepper.html',
    styleUrls: ['./stepper/custom-stepper.scss'],
    providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
})
export class StepperComponent extends CdkStepper {
    @Output() isPublished = new EventEmitter();
    @Input() isSubmitted;
    stepsCount = 2;
    @Input() type;

    onClick(index: number): void {
        this.selectedIndex = index;
    }

    Publish(idx: number): void {
        this.isPublished.emit(idx);
    }
}

export const atLeastOne = (validator: ValidatorFn, controls: string[] = null) => (
    group: FormGroup,
): ValidationErrors | null => {
    if (!controls) {
        controls = Object.keys(group.controls);
    }

    const hasAtLeastOne = group && group.controls && controls
        .some(k => !validator(group.controls[k]));

    return hasAtLeastOne ? null : {
        atLeastOne: true,
    };
};
