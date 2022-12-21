package br.com.digicom.sugar.processamento;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import br.com.digicom.sugar.dao.DaoBaseSugar;
import br.com.digicom.sugar.dao.DatasetSugar;
import br.com.digicom.sugar.daobase.DaoBase;
import br.com.digicom.sugar.modelo.PerguntaFormulario;
import br.com.digicom.sugar.modelo.RespostaFormulario;

public class LeArquivoForm extends DaoBaseSugar{

	private String[] cabecalho;
	private List<String[]> respostas;
	private Integer[] idPergunta;
	
	private List<List<RespostaFormulario>> respostaBaby;
 	
	@Override
	protected void executaImpl() {
		final DatasetSugar ds = (DatasetSugar) this.getComum();
		this.respostas = new ArrayList<String[]>();
		this.leArquivo();
		this.montaIdPergunta();
		System.out.println("Montou dados");
		this.montaListaResposta();
		ds.setListaResposta(this.respostaBaby);
		executaProximo();
	}
	
	private void montaListaResposta() {
		this.respostaBaby = new LinkedList<List<RespostaFormulario>>();
		for (int i=0; i<respostas.size();i++) {
			String[] linhaResposta = respostas.get(i);
			List<RespostaFormulario> respostas = new ArrayList<RespostaFormulario>();
			for (int j=0; j < linhaResposta.length;j++) {
				RespostaFormulario nova = new RespostaFormulario();
				nova.setPerguntaFormularioId(this.idPergunta[j]);
				nova.setValorResposta(Integer.parseInt(linhaResposta[j]));
				respostas.add(nova);
			}
			this.respostaBaby.add(respostas);
		}
	}
	
	private void montaIdPergunta() {
		final DatasetSugar ds = (DatasetSugar) this.getComum();
		this.idPergunta = new Integer[cabecalho.length];
		for (int i=0;i<cabecalho.length;i++) {
			Integer id = this.encontraIdPergunta(cabecalho[i]);
			idPergunta[i] = id;
		}
		
	}
	
	
	
	private Integer encontraIdPergunta(String texto) {
		final DatasetSugar ds = (DatasetSugar) this.getComum();
		for (PerguntaFormulario pergunta : ds.getListaPergunta()) {
			if (texto.trim().compareToIgnoreCase(pergunta.getTexto().trim())==0) {
				return pergunta.getId();
			}
		}
		System.out.println(texto);
		return null;
	}

	private void leArquivo() {
		System.out.println("Dir:" + System.getProperty("user.dir"));
		String row = null;
		String nomeArquivo = "resposta/Sugar Personalidade.csv";
		try {
			BufferedReader csvReader = new BufferedReader(new FileReader(nomeArquivo));
			row = csvReader.readLine();
			this.cabecalho = row.replace("\"", "").split(",");
			while ((row = csvReader.readLine()) != null) {
				String[] data = row.split(",");
				this.respostas.add(data);
				System.out.println(data.length);
			}
			csvReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	protected DaoBase getProximo() {
		// TODO Auto-generated method stub
		return null;
	}

}
