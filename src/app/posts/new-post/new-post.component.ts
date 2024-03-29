import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  permaLink: string = '';
  imgSrc: any = '/src/assets/placeholder-coding.jpg';

  selectedImg: any;

  categories: Array<any>;
  postForm: FormGroup;
  post: any;
  formStatus: string = 'Add New';
  docId: string;



  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(val => {

      this.docId = val['id'];
      if (this.docId) {
        this.postService.loadOneData(val['id']).subscribe(post => {

          this.post = post;

          this.postForm = this.fb.group({
            title: [this.post.title, [Validators.required, Validators.minLength(10)]],
            permaLink: [this.post.permaLink, Validators.required],
            excerpt: [this.post.excert, [Validators.required, Validators.minLength(50)]],
            category: [`${this.post.category.categoryId}-${this.post.category.categoryId}`, Validators.required],
            postImg: ['', Validators.required],
            content: [this.post.content, Validators.required]
          })

          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
        })

      }
      else{
        this.postForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(10)]], 
        permaLink: ['', Validators.required], 
        excerpt: ['', [Validators.required, Validators.minLength(50)]],
        category: ['', Validators.required], 
        postImg: ['', Validators.required], 
        content: ['', Validators.required] 
        })
      }

    })


  }

  get fc() {
    return this.postForm.controls;
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;

    })

  }

  onTitleChanged($event: any) {
    const title = $event.target.value;
    this.permaLink = title.replace(/\s/g, '-');

  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target!.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }


  onSubmit() {
    console.log(this.postForm.value);
    let splitted = this.postForm.value.category.split('-');
    console.log(splitted);

    const postData: Post = {
      title: this.postForm.value.title,
      permaLink: this.postForm.value.permaLink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      excert: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }

    this.postService.uploadImage(this.selectedImg, postData, this.formStatus, this.docId);
    this.postForm.reset();
    this.imgSrc = '/src/assets/placeholder-coding.jpg';;
  }
}
