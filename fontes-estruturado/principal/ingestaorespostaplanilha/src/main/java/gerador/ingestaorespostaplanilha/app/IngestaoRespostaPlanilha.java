package gerador.ingestaorespostaplanilha.app;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.io.FileWriter;
import java.io.PrintWriter;

import gerador.ingestaorespostaplanilha.passo.*;
import gerador.ingestaorespostaplanilha.passo.impl.*;
import br.com.gersis.daobase.comum.DaoBaseComum;

public class IngestaoRespostaPlanilha {

	private static String UrlLoopback = "";

	public static void main(String[] args) {
		System.out.print("IngestaoRespostaPlanilha");
		System.out.println("(01/11/2023 13:46:40)");
		try {
			carregaProp();
			IngestaoRespostaPlanilhaObj obj = new IngestaoRespostaPlanilhaObj();
			obj.executa();
			System.out.println("finalizou");
			System.exit(0);
		} catch (Exception e) {
			gravarErro(e);
		}
	}


	private static void gravarErro(Exception e) {
		try {
			FileWriter fileWriter = new FileWriter("IngestaoRespostaPlanilha.err", true);
			PrintWriter printWriter = new PrintWriter(fileWriter);
			e.printStackTrace(printWriter);
			printWriter.close();
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}

	private static void carregaProp() throws IOException {
		//System.out.println("Dir:" + System.getProperty("user.dir"));
		//InputStream input = new FileInputStream("CriaPythonTreinoRede.config");
		//Properties prop = new Properties();
		//prop.load(input);
		//UrlLoopback = prop.getProperty("loopback.url");
		UrlLoopback = "http://localhost:25002/api";
		DaoBaseComum.setUrl(UrlLoopback);
	}

	private static void preparaComum() {
		DaoBaseComum.setUrl(UrlLoopback);
		DaoBaseComum.setProximo("IngestaoRespostaPlanilhaObj", new PerguntaFormulario_ListaAtivaImpl());
		DaoBaseComum.setProximo("PerguntaFormulario_ListaAtiva", new ImportaPlanilhaImpl());
	}
}
