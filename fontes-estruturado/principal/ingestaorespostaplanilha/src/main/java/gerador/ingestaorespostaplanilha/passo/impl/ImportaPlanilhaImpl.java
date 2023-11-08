package gerador.ingestaorespostaplanilha.passo.impl;


import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import br.com.gersis.loopback.modelo.Baby;
import br.com.gersis.loopback.modelo.PerguntaFormulario;
import br.com.gersis.loopback.modelo.RespostaFormulario;
import gerador.ingestaorespostaplanilha.passo.ImportaPlanilha;
import gerador.ingestaorespostaplanilha.passo.apoio.BabyArquivo;



public class ImportaPlanilhaImpl extends ImportaPlanilha { 

	
	private String[] cabecalho;
	private List<String[]> respostas;
	private Integer[] idPergunta;
	
	private List<Baby> respostaBaby;
	
	private List<PerguntaFormulario> listaPergunta;
	
	
	@Override
	protected boolean executaCustom(List<PerguntaFormulario> listaPergunta) {
		this.listaPergunta = listaPergunta;
		this.respostas = new ArrayList<String[]>();
		this.leArquivo();
		this.montaIdPergunta();
		System.out.println("Montou dados");
		this.montaListaResposta();
		this.saidaListaResposta = respostaBaby;
		return true;
	}

	
	

	private void montaListaResposta() {
		this.respostaBaby = new LinkedList<Baby>();
		for (int i=0; i<respostas.size();i++) {
			Baby baby = new Baby();
			String[] linhaResposta = respostas.get(i);
			List<RespostaFormulario> respostas = new ArrayList<RespostaFormulario>();
			for (int j=0; j < linhaResposta.length;j++) {
				if (this.idPergunta[j]!=null) {
					RespostaFormulario nova = new RespostaFormulario();
					nova.setPerguntaFormularioId(this.idPergunta[j]);
					System.out.println(linhaResposta[j]);
					nova.setValorResposta(getValor(linhaResposta[j]));
					respostas.add(nova);
				}
			}
			baby.setRespostaFormularios(respostas);
			baby.setEmail(getTexto(linhaResposta[1]));
			baby.setNomeApelido(getTexto(linhaResposta[2]));
			baby.setAltura(getTexto(linhaResposta[3]));
			baby.setPeso(getTexto(linhaResposta[4]));
			baby.setQuadril(getTexto(linhaResposta[5]));
			baby.setDataNascimento(getTexto(linhaResposta[6]));
			this.respostaBaby.add(baby);
		}
	}
	
	private int getValor(String dado) {
		if (dado.length()==2) {
			return 0;
		} else {
			return Integer.parseInt(dado.substring(1,2));
		}
	}
	private String getTexto(String dado) {
		if (dado.length()==2) {
			return "";
		} else {
			return dado.substring(1,dado.length()-1);
		}
	}
	
	private void montaIdPergunta() {
		this.idPergunta = new Integer[cabecalho.length];
		for (int i=0;i<cabecalho.length;i++) {
			Integer id = this.encontraIdPergunta(cabecalho[i]);
			idPergunta[i] = id;
		}
		
	}
	
	
	
	private Integer encontraIdPergunta(String texto) {
		for (PerguntaFormulario pergunta : listaPergunta) {
			if (texto.trim().compareToIgnoreCase(pergunta.getTexto().trim())==0) {
				return new Integer(pergunta.getId().toString());
			}
		}
		//System.out.println(texto);
		return null;
	}

	private void leArquivo() {
		System.out.println("Dir:" + System.getProperty("user.dir"));
		String row = null;
		String nomeArquivo = "planilhas/Sugar Personalidade.csv";
		try {
			BufferedReader csvReader = new BufferedReader(new FileReader(nomeArquivo));
			row = csvReader.readLine();
			this.cabecalho = row.replace("\"", "").split(",");
			while ((row = csvReader.readLine()) != null) {
				//String[] data = row.split(",");
				String[] data = row.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
				this.respostas.add(data);
				System.out.println(data.length);
			}
			csvReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}

