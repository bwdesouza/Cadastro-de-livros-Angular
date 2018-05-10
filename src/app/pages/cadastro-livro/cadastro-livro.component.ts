import { Funcao } from '../../view-models/funcao';
import { Tags } from '../../view-models/tags';
import { Router } from '@angular/router';
import { CadastroEditoraComponent } from '../cadastro-editora/cadastro-editora.component';
import { CadastroSubCategoriaComponent } from '../cadastro-sub-categoria/cadastro-sub-categoria.component';
import { CadastroCategoriaComponent } from '../cadastro-categoria/cadastro-categoria.component';
import { CadastroAutorComponent } from '../cadastro-autor/cadastro-autor.component';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';

import { LivroService } from '../../services/livro.service';
import { error } from 'util';
import { Editora } from '../../view-models/editora';
import { CompleterData, CompleterService } from 'ng2-completer';


import { Categoria } from '../../view-models/categoria';
import { SubCategoria } from '../../view-models/subcategoria';
import { CategoriaService } from '../../services/categoria.service';
import { SubCategoriaService } from '../../services/subcategoria.service';
import { EditoraService } from '../../services/editora.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LivroDigital } from '../../view-models/livro-digital';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { Options, ImageResult } from "ngx-image2dataurl";

import swal from 'sweetalert2'
import { PaisService } from '../../services/pais.service';
import { IdiomaService } from '../../services/idioma.service';
import { TagsService } from '../../services/tags.service';
import { StatusProducao } from '../../view-models/status-producao';
import { TagInputModule } from 'ngx-chips';
import { MembroEquipeTecnica } from '../../view-models/membro-equipe-tecnica';
import { FuncaoService } from '../../services/funcao-service';
import { ProfessorMoipService } from '../../services/professor-moip.service';
import { ProfessorMoip } from '../../view-models/professor-moip';
import { TipoLivroService } from '../../services/tipoLivro.service';
import { forEach } from '@angular/router/src/utils/collection';
import { LivroTrasposto } from '../../view-models/livro-transposto';

@Component({
  selector: 'app-cadastro-livro',
  templateUrl: './cadastro-livro.component.html',
  providers: [LivroService, CategoriaService, SubCategoriaService, EditoraService, PaisService, IdiomaService, TagsService, FuncaoService, TipoLivroService, ProfessorMoipService]
})

export class CadastroLivroComponent implements OnInit {

  @ViewChild('cadastroCategoria')
  cadastroCategoriaComponent: CadastroCategoriaComponent;
  @ViewChild('cadastroSubCategoria')
  cadastroSubCategoriaComponent: CadastroSubCategoriaComponent;
  @ViewChild('cadastroEditora')
  cadastroEditoraComponent: CadastroEditoraComponent;

  @Output() buttonReset = new EventEmitter();

  options: Options = {
    resize: {
      maxHeight: 494,
      maxWidth: 339
    },
    allowedExtensions: ['JPG', 'PNG', 'JPEG']
  };

  selectedFile: any;
  selectedFileAsBase64String: any;
  imagem: any = "../assets/imagem/empyt.png";
  imagemOld: any;
  classeImagem: any = "imagem-mascara-display";
  photo: any = "../assets/imagem/mascara-3.png";
  editoras = new Array<Editora>();
  professores = new Array<ProfessorMoip>();
  categorias = new Array<Categoria>();

  subcategorias = new Array<SubCategoria>();
  allTags = new Array<Tags>();
  allFuncoes = new Array<Funcao>();
  idiomas = [];
  paises = [];
  tiposLivro = [];
  professorSelecionado: any;
  editoraSelecionada: any;
  categoriaSelecionada: any;
  subcategoriaSelecionada: any;
  items: any = [];
  livroDigitalGroup: FormGroup;
  idLivroEmEdicao: number;
  livroEmEdicao: LivroDigital;
  desabilitaSubCategoria: boolean = true;
  idCategoriaSelecionada: number;
  idSubCategoriaSelecionada: number;
  autoTags: any;
  apenasVisualizacao: boolean;
  escondeBotaoEditar: string;
  membrosAdd = new Array<MembroEquipeTecnica>();
  camposObrigatorios: string[];
  protected searchStr: string;
  protected captain: string;
  protected dataService: CompleterData;
  protected cateService: CompleterData;
  protected subcateService: CompleterData;
  protected funcoesService: CompleterData;
  protected professoresMoipService: CompleterData;
  esconderCampo: boolean = false;

  constructor(private livroService: LivroService,
    private categoriaService: CategoriaService,
    private subcategoriaService: SubCategoriaService,
    private editoraService: EditoraService,
    private idiomaService: IdiomaService,
    private paisService: PaisService,
    private tipoLivroService: TipoLivroService,
    private tagsService: TagsService,
    private funcaoService: FuncaoService,
    private professorMoipService: ProfessorMoipService,
    private completerService: CompleterService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    public fb: FormBuilder) {

    TagInputModule.withDefaults({
      tagInput: {
        placeholder: 'Tag',
        secondaryPlaceholder: 'Tag'
      }
    });

  }


  //Atribui propriedades ao componente Ballon
  InsereReadAttr(visualizacao: boolean) {
    var dom = document;
    if (visualizacao) {
      //Tag
      let balloonElemTag1 = dom.querySelector('#divBallonTag');
      balloonElemTag1.removeAttribute('data-balloon-visible');
      balloonElemTag1.removeAttribute('data-balloon');
      balloonElemTag1.removeAttribute('data-balloon-pos');
      //Imagem
      let balloonElemImagem1 = dom.querySelector('#divBallonImagem');
      balloonElemImagem1.removeAttribute('data-balloon');
      balloonElemImagem1.removeAttribute('data-balloon-pos');
      //Obrigatorio
      this.camposObrigatorios.forEach(campo => {
        let AsteriscoElemSpan1 = dom.querySelector(campo);
        AsteriscoElemSpan1.removeAttribute('style');
        AsteriscoElemSpan1.setAttribute('style', 'visibility: hidden');
      });

    } else {
      //Tag
      let balloonElem2 = dom.querySelector('#divBallonTag');
      balloonElem2.setAttribute('data-balloon-visible', '');
      balloonElem2.setAttribute('data-balloon', 'Digite uma Tag e pressione a tecla Enter')
      balloonElem2.setAttribute('data-balloon-pos', 'up')
      //Imagem
      let balloonElemImagem2 = dom.querySelector('#divBallonImagem');
      balloonElemImagem2.setAttribute('data-balloon', 'Editar imagem')
      balloonElemImagem2.setAttribute('data-balloon-pos', 'up')
      //Obrigatorio
      this.camposObrigatorios.forEach(campo2 => {
        let AsteriscoElemSpan2 = dom.querySelector(campo2);
        AsteriscoElemSpan2.removeAttribute('style');
        AsteriscoElemSpan2.setAttribute('style', 'visibility: visible');
      });
    }
  };
  preencheArrayObrigatorios() {
    this.camposObrigatorios = new Array("#spanObgt1", "#spanObgt2", "#spanObgt3", "#spanObgt4", "#spanObgt5",
      "#spanObgt6", "#spanObgt7", "#spanObgt8", "#spanObgt9", "#spanObgt10",
      "#spanObgt11", "#spanObgt12", "#spanObgt13", "#spanObgt14", "#spanObgt15",
      "#spanObgt16", "#spanObgt17", "#spanObgt18", "#spanObgt19", "#spanObgt20",
      "#spanObgt21", "#spanObgt22", "#spanObgt23")
  }

  //Métodos para iniciar a tala.
  ngOnInit() {
    let param = JSON.parse(localStorage.getItem("objLivro"));
    this.idLivroEmEdicao = +param.id;
    this.apenasVisualizacao = param.visual;

    this.spinnerService.show();
    this.carregaEditoras();
    this.carregaCategoria();
    this.carregaPaises();
    this.carregaTiposLivro();
    this.carregaIdiomas();
    this.carregaTags();
    this.carregaFuncoes();
    this.carregaProfessoresMoip();
    this.carregaFormulario();
    this.preencheArrayObrigatorios();
    this.InsereReadAttr(this.apenasVisualizacao);

    if (+this.idLivroEmEdicao > 0)
      this.buscarLivro(this.idLivroEmEdicao);
    else
      this.idLivroEmEdicao = 0;

    this.apenasExibicao();

    //Carrega a variavel com um array vazio para não dar erro no search
    this.subcateService = this.completerService.local(this.subcategorias, 'descricao', 'descricao');
  }

  apenasExibicao() {
    if (this.apenasVisualizacao) {
      this.escondeBotaoEditar = "esconde-botao-editar";
    }
    else {
      this.escondeBotaoEditar = "";
    }
  }

  abriCadastroCategoria() {
    this.cadastroCategoriaComponent.abrirModal();
  }

  abriCadastroSubCategoria() {
    this.cadastroSubCategoriaComponent.abrirModal();
  }

  abriCadastroEditora() {
    this.cadastroEditoraComponent.abrirModal();
  }

  carregaFormulario() {
    if (this.livroEmEdicao == undefined) {
      this.livroDigitalGroup = this.fb.group({
        capa: new FormControl(''),
        titulo: new FormControl('', [Validators.required, Validators.minLength(10)]),
        subtitulo: new FormControl('', [Validators.required, Validators.minLength(10)]),
        isbnDigital: new FormControl('', [Validators.required, Validators.minLength(13)]),
        colecaoSerie: new FormControl('', [Validators.required, Validators.minLength(10)]),
        //infAdiciCarac: new FormControl(''),
        ano: new FormControl('', [Validators.required, Validators.minLength(4)]),
        edicao: new FormControl('', [Validators.required, Validators.minLength(1)]),
        autoria: new FormControl('', [Validators.required]),
        idEditora: new FormControl('', [Validators.required]),
        volume: new FormControl('', [Validators.required, Validators.minLength(1)]),
        idTipoLivro: new FormControl('', [Validators.required]),
        paginas: new FormControl('', [Validators.required, Validators.minLength(1)]),
        idIdioma: new FormControl('', [Validators.required]),
        idPais: new FormControl('', [Validators.required]),
        idCategoria: new FormControl('', [Validators.required]),
        idSubCategoria: new FormControl('', [Validators.required]),
        sinopse: new FormControl('', [Validators.required, Validators.minLength(1)]),
        complemento: new FormControl('', [Validators.required, Validators.minLength(1)]),
        observacoes: new FormControl('', [Validators.required, Validators.minLength(1)]),
        tags: new FormControl('', [Validators.required]),
        nomeResponsavel: new FormControl('', [Validators.required]),
        funcao: new FormControl('', [Validators.required]),
        //Não são obrigatórios daqui pra baixo.
        isbnImpresso: new FormControl('', []),
        codAxLivroImpresso: new FormControl('', []),
        codAxLivroDigital: new FormControl('', []),
        cod5Elemento: new FormControl('', []),
        precoImpresso: new FormControl('', []),
        precoDigital: new FormControl('', []),
        linkLivroImpresso: new FormControl('', []),
        linkLivroDigital: new FormControl('', []),
        texto4Capa: new FormControl('', []),
        sumario: new FormControl('', []),
        sumarioReduzido: new FormControl('', []),
      });
    }
    else {
      this.carregaImagemNoCampo(this.livroEmEdicao.capaString);
      this.livroDigitalGroup.patchValue({
        //capa: "data:image/jpeg;base64," + btoa(this.livroEmEdicao.capaString),
        titulo: this.livroEmEdicao.titulo,
        subtitulo: this.livroEmEdicao.subTitulo,
        isbnDigital: this.livroEmEdicao.isbnDigital,
        colecaoSerie: this.livroEmEdicao.colecaoSerie,
        //infAdiciCarac: '',
        ano: this.livroEmEdicao.ano,
        edicao: this.livroEmEdicao.edicao,
        autoria: this.livroEmEdicao.autoria,
        idEditora: this.livroEmEdicao.idEditora,
        volume: this.livroEmEdicao.volume,
        idTipoLivro: this.livroEmEdicao.idTipoLivro,
        paginas: this.livroEmEdicao.paginas,
        idIdioma: this.livroEmEdicao.idIdioma,
        idPais: this.livroEmEdicao.idPais,
        idCategoria: this.livroEmEdicao.categoria.descricao,
        idSubCategoria: this.livroEmEdicao.subCategoria.descricao,
        sinopse: this.livroEmEdicao.sinopse,
        complemento: this.livroEmEdicao.complemento,
        observacoes: this.livroEmEdicao.observacoes,
        tags: this.carregaTagsParaTela(this.livroEmEdicao.tags),
        nomeResponsavel: this.livroEmEdicao.membroEquipeTecnica[0].nomeResponsavel,
        funcao: this.livroEmEdicao.membroEquipeTecnica[0].funcao.descricao,
        //Não são obrigatórios daqui pra baixo.
        isbnImpresso: this.livroEmEdicao.isbnImpresso,
        codAxLivroImpresso: this.livroEmEdicao.codAxLivroImpresso,
        codAxLivroDigital: this.livroEmEdicao.codAxLivroDigital,
        cod5Elemento: this.livroEmEdicao.cod5Elemento,
        precoImpresso: this.livroEmEdicao.precoImpresso,
        precoDigital: this.livroEmEdicao.precoDigital,
        linkLivroImpresso: this.livroEmEdicao.linkLivroImpresso,
        linkLivroDigital: this.livroEmEdicao.linkLivroDigital,
        texto4Capa: this.livroEmEdicao.texto4Capa,
        sumario: this.livroEmEdicao.sumario,
        sumarioReduzido: this.livroEmEdicao.sumarioReduzido
      });
      this.idCategoriaSelecionada = this.livroEmEdicao.categoria.id;
      this.idSubCategoriaSelecionada = this.livroEmEdicao.subCategoria.id;

      this.livroEmEdicao.membroEquipeTecnica.forEach(membros => {
        this.gravarMembroEquipeTecnica(membros.nomeResponsavel, membros.funcao, membros);
      });

    }
    if (this.apenasVisualizacao)
      this.livroDigitalGroup.disable();
  }

  //Carregar imagem inicial na pagina
  carregaImagemNoCampo(img: string) {
    if (img != "")
      this.imagem = "data:image/jpeg;base64," + img;
  }

  trocaImagem() {
    this.classeImagem = "imagem-mascara";
    this.photo = "../assets/imagem/mascara-3.png";
  }

  voltaImagem() {
    this.classeImagem = "imagem-mascara-display";
  }

  reset() {
    swal({
      title: 'Deseja realmente limpar os campos?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true,
      confirmButtonText: 'Sim!'
    }).then((result) => {
      if (result.value) {
        document.getElementById("buttonReset").click();
        this.imagem = "../assets/imagem/empyt.png";
        this.membrosAdd = [];
        swal(
          'Deletado!',
          'Os campos foram apagados.',
          'success'
        )
      }
    })
  }

  //Fazer todas as buscas do BackEnd
  buscarLivro(id: number) {
    this.livroService.buscarLivro(id)
      .subscribe(result => {
        this.livroEmEdicao = new LivroDigital();
        this.livroEmEdicao = result.data;
        this.spinnerService.hide();
        this.carregaFormulario();
      }
        , error => {
          swal({
            title: 'Erro ao carregar o livro!',
            text: 'Por favor tente novamente ou contate a equipe técnica!',
            type: 'error',
            confirmButtonText: 'Ok'
          });
          this.spinnerService.hide();
        });
  }

  carregaEditoras() {
    this.editoraService.listAll()
      .subscribe(result => {
        this.editoras = [];
        result.data.forEach(editora => {
          this.editoras.push(editora);
        });
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      });
  }

  carregaCategoria() {
    this.categoriaService.buscarCategoria()
      .subscribe(result => {
        this.categorias = [];
        result.data.forEach(cat => {
          this.categorias.push(cat);
        });
        this.cateService = this.completerService.local(this.categorias, 'descricao', 'descricao');
      }, error => {
        console.log(error);
      });
  }

  carregaSubCategoria(idCategoria: number) {
    this.subcategoriaService.buscarSubCategoria(idCategoria)
      .subscribe(result => {
        this.subcategorias = [];
        result.data.forEach(subCat => {
          this.subcategorias.push(subCat);
        });
        this.subcateService = this.completerService.local(this.subcategorias, 'descricao', 'descricao');
        this.livroDigitalGroup.controls['idSubCategoria'].setValue('');

        if (this.subcategorias.length > 0) {
          this.desabilitaSubCategoria = false;
        }
        else {
          this.desabilitaSubCategoria = true;
          swal({
            title: 'Para categoria escolhida não existe subcategoria vinculada!',
            text: 'Por favor, cadastre uma subcategoria para está categoria ou escolha uma outra.',
            type: 'info',
            confirmButtonText: 'Ok'
          });
        }
      }, error => {
        console.log(error);
      });
  }

  carregaPaises() {
    this.paisService.buscarPaises()
      .subscribe(result => {
        result.data.forEach(p => {
          this.paises.push(p);
        });
      }, error => {
        console.log(error);
      });
  }

  carregaTiposLivro() {
    this.tipoLivroService.ListAll()
      .subscribe(result => {
        result.data.forEach(t => {
          this.tiposLivro.push(t);
        });
      }, error => {
        console.log(error);
      });
  }


  carregaIdiomas() {
    this.idiomaService.buscarIdiomas()
      .subscribe(result => {
        result.data.forEach(i => {
          this.idiomas.push(i);
        });
      }, error => {
        console.log(error);
      });
  }

  carregaTags() {
    this.tagsService.buscarTags()
      .subscribe(result => {
        result.data.forEach(i => {
          this.allTags.push(i);
        });
        this.autoTags = this.carregaTagsParaTela(this.allTags);
      }, error => {
        console.log(error);
      });
  }

  carregaFuncoes() {
    this.funcaoService.buscarFuncoes()
      .subscribe(result => {
        this.allFuncoes = [];
        result.data.forEach(fun => {
          this.allFuncoes.push(fun);
        });
        this.funcoesService = this.completerService.local(this.allFuncoes, 'descricao', 'descricao');
      }, error => {
        console.log(error);
      });
  }


  carregaProfessoresMoip() {
    this.professorMoipService.getToken()
      .subscribe(result => {
        var tokenResult = result.data;
        //Todos=-1;Like=qualquer nome
        var nome = '-1';
        //Ativo=1;Inativo=0;Todos=-1
        var ativo = '1';
        this.professorMoipService.listAll(tokenResult.token, nome, ativo)
          .subscribe(result2 => {
            this.professores = [];
            result2.data.forEach(professor => {
              this.professores.push(professor);
            });
            this.professoresMoipService = this.completerService.local(this.professores, 'nome', 'nome');
            this.spinnerService.hide();
          }, error => {
            console.log(error);
            this.spinnerService.hide();
          });
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      });
  }


  buscaSubCategoria(descCategoria) {
    if (descCategoria != '') {
      let categoriaSelecionada = this.categorias.find(p => p.descricao == descCategoria);
      this.idCategoriaSelecionada = categoriaSelecionada.id;
      this.carregaSubCategoria(this.idCategoriaSelecionada);
    }
  }

  selecionarSubCategoria(descSubCat) {
    let subCategoriaSelecionada = this.subcategorias.find(p => p.descricao == descSubCat);
    this.idSubCategoriaSelecionada = subCategoriaSelecionada.id;
  }

  adicionarMembrosEquipeTecnica(nomeResponsavel: string, funcao: string) {
    if (nomeResponsavel == '' || funcao == '') {
      swal({
        position: 'center',
        type: 'info',
        title: 'Por favor, preencha o nome do responsável e a função!',
        showConfirmButton: false,
        timer: 2300
      });
      return;
    }
    else {
      let funcaoSelec = this.allFuncoes.find(p => p.descricao == funcao);
      if (funcaoSelec == undefined) {
        let func = new Funcao();
        func.id = 0;
        func.descricao = funcao;

        this.spinnerService.show();
        this.funcaoService.cadastroFuncao(func)
          .subscribe(result => {
            func = result.data;
            this.allFuncoes.push(func);

            let indexMembro = this.membrosAdd.findIndex(p => p.nomeResponsavel === nomeResponsavel && p.funcao.descricao === funcao);
            if (indexMembro != -1) {
              swal({
                position: 'top-right',
                type: 'error',
                title: 'Esse item já existe na lista!',
                showConfirmButton: false,
                timer: 2300
              });
              return;
            }

            this.gravarMembroEquipeTecnica(nomeResponsavel, func, new MembroEquipeTecnica());

            this.spinnerService.hide();
          }, error => {
            console.log(error);
            this.spinnerService.hide();
          });
      }
      else {
        this.gravarMembroEquipeTecnica(nomeResponsavel, funcaoSelec, new MembroEquipeTecnica());
      }
    }
  }

  gravarMembroEquipeTecnica(nmResp, func, membros) {
    let mb = new MembroEquipeTecnica();
    let fn = new Funcao();
    mb.id = membros.id != undefined ? membros.id : 0;
    mb.nomeResponsavel = nmResp;
    mb.idFuncao = func.id;
    mb.IdLivroDigital = membros.idLivroDigital != undefined ? membros.idLivroDigital : 0;
    fn.id = func.id;
    fn.descricao = func.descricao;
    mb.funcao = fn;
    this.membrosAdd.push(mb);
  }

  retiraMembroLista(nmResp, func) {
    let indexMembro = this.membrosAdd.findIndex(p => p.nomeResponsavel === nmResp && p.funcao.descricao === func);
    if (indexMembro != -1)
      this.membrosAdd.splice(indexMembro, 1);
  }

  //Validações e componentes de imagem.
  onFileChange(event) {
    let files = event.srcElement.files;
    this.selectedFile = files[0];
    if (files && this.selectedFile) {
      let reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.selectedFile);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.selectedFileAsBase64String = btoa(binaryString);
  }

  selected(imageResult: ImageResult) {
    if (imageResult.error) alert(imageResult.error);
    this.imagem = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
  }

  //Validações das TAGS
  carregaTagsParaBack(tags): Tags[] {
    let tagsAdd = new Array<Tags>();
    if (tags != "") {
      tags.forEach(t => {
        let tag = new Tags();
        tag.id = t.value != t.display ? +t.value : 0;
        tag.tag = t.display;
        tagsAdd.push(tag);
      });
    }
    return tagsAdd;
  }

  carregaTagsParaTela(tags): any {
    let retornoTags: any = [];

    tags.forEach(t => {
      let tag = { display: t.tag, value: t.id };
      retornoTags.push(tag);
    });

    return retornoTags;
  }

  //Salvar formulário
  onSubmit() {
    if (this.imagem == "../assets/imagem/empyt.png") {
      swal({
        title: 'Validação!',
        text: 'A capa do livro é obrigatório!',
        type: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    else if (this.membrosAdd.length <= 0) {
      swal({
        title: 'Validação!',
        text: 'Nome do Responsável e Função são obrigatórios!',
        type: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    this.spinnerService.show();
    let dtaHoje = new Date();
    let novoLivro = new LivroDigital();

    novoLivro = {
      id: this.idLivroEmEdicao,
      isbnDigital: this.livroDigitalGroup.value['isbnDigital'],
      titulo: this.livroDigitalGroup.value['titulo'],
      subTitulo: this.livroDigitalGroup.value['subtitulo'],
      edicao: +this.livroDigitalGroup.value['edicao'],
      ano: +this.livroDigitalGroup.value['ano'],
      autoria: this.livroDigitalGroup.value['autoria'],
      idTipoLivro: +this.livroDigitalGroup.value['idTipoLivro'],
      paginas: +this.livroDigitalGroup.value['paginas'],
      idEditora: this.livroDigitalGroup.value['idEditora'],
      idIdioma: +this.livroDigitalGroup.value['idIdioma'],
      colecaoSerie: this.livroDigitalGroup.value['colecaoSerie'],
      volume: +this.livroDigitalGroup.value['volume'],
      idPais: +this.livroDigitalGroup.value['idPais'],
      sinopse: this.livroDigitalGroup.value['sinopse'],
      idCategoria: +this.idCategoriaSelecionada,
      idSubCategoria: +this.idSubCategoriaSelecionada,
      // capa: null,
      capaString: this.selectedFileAsBase64String,
      complemento: this.livroDigitalGroup.value['complemento'],
      observacoes: this.livroDigitalGroup.value['observacoes'],
      isbnImpresso: this.livroDigitalGroup.value['isbnImpresso'],
      codAxLivroImpresso: this.livroDigitalGroup.value['codAxLivroImpresso'],
      codAxLivroDigital: this.livroDigitalGroup.value['codAxLivroDigital'],
      cod5Elemento: this.livroDigitalGroup.value['cod5Elemento'],
      precoDigital: +this.livroDigitalGroup.value['precoDigital'],
      precoImpresso: +this.livroDigitalGroup.value['precoImpresso'],
      linkLivroDigital: this.livroDigitalGroup.value['linkLivroDigital'],
      linkLivroImpresso: this.livroDigitalGroup.value['linkLivroImpresso'],
      texto4Capa: this.livroDigitalGroup.value['texto4Capa'],
      sumario: this.livroDigitalGroup.value['sumario'],
      sumarioReduzido: this.livroDigitalGroup.value['sumarioReduzido'],
      dtaCadastro: dtaHoje,
      skuECommerce: '',
      tags: this.carregaTagsParaBack(this.livroDigitalGroup.value['tags']),
      categoria: new Categoria(),
      subCategoria: new SubCategoria(),
      editora: new Editora(),
      statusProducao: new StatusProducao(),
      membroEquipeTecnica: this.membrosAdd
    };

    if (+this.idLivroEmEdicao <= 0) {
      this.livroService.cadastrarNovoLivro(novoLivro)
        .subscribe(result => {
          swal({
            position: 'top-right',
            type: 'success',
            title: 'Livro foi salvo com sucesso!',
            showConfirmButton: false,
            timer: 2500
          });
          this.spinnerService.hide();
          this.router.navigate(['']);
        }, error => {
          if (error.status == 400) {
            let msgError = JSON.parse(error._body);
            swal({
              title: 'Algo de errado aconteceu!',
              text: msgError.errors[0].message,
              type: 'error',
              confirmButtonText: 'Ok'
            });
          } else {
            swal({
              title: 'Algo de errado aconteceu!',
              text: 'Por favor tente novamente ou contate a equipe técnica!',
              type: 'error',
              confirmButtonText: 'Ok'
            });
          }
          this.spinnerService.hide();
        });
    }
    else {
      this.livroService.atualizarLivro(novoLivro)
        .subscribe(result => {
          swal({
            position: 'top-right',
            type: 'success',
            title: 'Livro atualizado com sucesso!',
            showConfirmButton: false,
            timer: 2500
          });
          this.spinnerService.hide();
          this.router.navigate(['']);
        }, error => {
          if (error.status == 400) {
            let msgError = JSON.parse(error._body);
            swal({
              title: 'Algo de errado aconteceu!',
              text: msgError.errors[0].message,
              type: 'error',
              confirmButtonText: 'Ok'
            });
          } else {
            swal({
              title: 'Algo de errado aconteceu!',
              text: 'Por favor tente novamente ou contate a equipe técnica!',
              type: 'error',
              confirmButtonText: 'Ok'
            });
          }
          this.spinnerService.hide();
        });
    }
  }

  atualizaCategoria() {
    this.carregaCategoria();
  }

  atualizaSubCategoria() {
    this.carregaSubCategoria(this.idCategoriaSelecionada);
  }

  atualizaEditora() {
    this.carregaEditoras();
  }



  voltarListagemLivros() {
    this.router.navigate(['']);
  }

  public validators = [this.MaxLengthAt];
  private MaxLengthAt(control: FormControl) {
    if (control.value.length > 50) {
      return {
        'maxLengthAt': true
      };
    }
    return null;
  }
  public errorMessages = {
    'maxLengthAt': 'No máximo 50 caracteres!'
  };

}